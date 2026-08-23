const conteudoService = require('../services/conteudo.service');

function listar(req, res) {
    const dados = conteudoService.listarCatalogo(req.query);
    res.render('site/conteudos', { titulo: 'Conteúdos', ...dados });
}

function detalhe(req, res) {
    const dados = conteudoService.buscarDetalhe(req.params.slug);
    if (!dados) {
        return res.status(404).render('site/404', { titulo: 'Página não encontrada' });
    }
    res.render('site/conteudo', { titulo: dados.conteudo.titulo, ...dados });
}

module.exports = { listar, detalhe };
