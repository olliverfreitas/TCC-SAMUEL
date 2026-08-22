const { validationResult } = require('express-validator');
const duvidaService = require('../services/duvida.service');

function exibirFormulario(req, res) {
    res.render('site/duvidas', { titulo: 'Duvidas', erros: [], enviado: false });
}

function enviar(req, res) {
    const erros = validationResult(req);
    if (!erros.isEmpty()) {
        return res.status(400).render('site/duvidas', {
            titulo: 'Duvidas',
            erros: erros.array(),
            enviado: false,
        });
    }

    duvidaService.enviarDuvida(req.body.pergunta);
    res.render('site/duvidas', { titulo: 'Duvidas', erros: [], enviado: true });
}

module.exports = { exibirFormulario, enviar };
