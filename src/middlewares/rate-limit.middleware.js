function limitarPorSessao({ chave, maxTentativas, janelaMs }) {
    return function (req, res, next) {
        const agora = Date.now();
        const historico = (req.session[chave] || []).filter((timestamp) => agora - timestamp < janelaMs);

        if (historico.length >= maxTentativas) {
            req.rateLimitExcedido = true;
            return next();
        }

        historico.push(agora);
        req.session[chave] = historico;
        next();
    };
}

module.exports = { limitarPorSessao };
