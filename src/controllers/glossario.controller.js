const glossarioService = require('../services/glossario.service');

function exibir(req, res) {
    const dados = glossarioService.listarPorLetra(req.query.letra);
    res.render('site/glossario', { titulo: 'Glossário', ...dados });
}

module.exports = { exibir };
