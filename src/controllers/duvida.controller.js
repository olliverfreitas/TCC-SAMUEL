const duvidaService = require('../services/duvida.service');

function exibir(req, res) {
    const faq = duvidaService.listarFaqPublicado();
    res.render('site/duvidas', { titulo: 'Dúvidas', faq, erro: null, enviado: false });
}

function enviar(req, res) {
    if (req.rateLimitExcedido) {
        const faq = duvidaService.listarFaqPublicado();
        return res.status(429).render('site/duvidas', {
            titulo: 'Dúvidas',
            faq,
            erro: 'Você atingiu o limite de envios. Tente novamente em alguns minutos.',
            enviado: false,
        });
    }

    const resultado = duvidaService.enviarDuvida(req.body.pergunta);

    if (resultado.erro) {
        const faq = duvidaService.listarFaqPublicado();
        return res.status(400).render('site/duvidas', { titulo: 'Dúvidas', faq, erro: resultado.erro, enviado: false });
    }

    const faq = duvidaService.listarFaqPublicado();
    res.render('site/duvidas', { titulo: 'Dúvidas', faq, erro: null, enviado: true });
}

module.exports = { exibir, enviar };
