const conteudoService = require('../services/conteudo.service');

function home(req, res) {
    const categorias = conteudoService.listarCategorias();
    const artigos = conteudoService.listarArtigosPublicados();
    res.render('site/home', { titulo: 'Inicio', categorias, artigos });
}

function categoria(req, res) {
    const dados = conteudoService.buscarCategoriaComArtigos(req.params.slug);
    if (!dados) {
        return res.status(404).render('site/404', { titulo: 'Categoria nao encontrada' });
    }
    res.render('site/categoria', { titulo: dados.categoria.nome, ...dados });
}

function artigo(req, res) {
    const artigo = conteudoService.buscarArtigoPorSlug(req.params.slug);
    if (!artigo || !artigo.publicado) {
        return res.status(404).render('site/404', { titulo: 'Artigo nao encontrado' });
    }
    res.render('site/artigo', { titulo: artigo.titulo, artigo });
}

module.exports = { home, categoria, artigo };
