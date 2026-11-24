const { rateLimit } = require('express-rate-limit');

// Protege POST /admin/login contra força bruta. O limite é por IP porque quem
// ataca descarta o cookie a cada tentativa, o que tornaria inútil um limite por
// sessão. O contador fica só em memória e expira sozinho ao fim da janela:
// nenhum IP é gravado no banco.
function limitarLoginPorIp({ maxTentativas = 5, janelaMs = 15 * 60 * 1000 } = {}) {
    const minutos = Math.ceil(janelaMs / 60000);

    return rateLimit({
        windowMs: janelaMs,
        limit: maxTentativas,
        // Login certo não conta: só as tentativas erradas esgotam o limite, para o
        // admin legítimo não ser bloqueado por entrar e sair várias vezes.
        skipSuccessfulRequests: true,
        standardHeaders: 'draft-8',
        legacyHeaders: false,
        handler(req, res) {
            res.status(429).render('admin/login', {
                titulo: 'Login',
                erro: `Muitas tentativas de login. Aguarde ${minutos} minutos e tente novamente.`,
            });
        },
    });
}

module.exports = { limitarLoginPorIp };
