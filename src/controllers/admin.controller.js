const artigoAdminService = require('../services/artigoAdmin.service');
const duvidaService = require('../services/duvida.service');

function dashboard(req, res) {
    const artigos = artigoAdminService.listarTodos();
    const duvidasPendentes = duvidaService.listarPendentes();
    res.render('admin/dashboard', {
        titulo: 'Painel administrativo',
        totalArtigos: artigos.length,
        totalDuvidasPendentes: duvidasPendentes.length,
    });
}

function listarArtigos(req, res) {
    const artigos = artigoAdminService.listarTodos();
    res.render('admin/artigos/lista', { titulo: 'Artigos', artigos });
}

function exibirFormularioArtigo(req, res) {
    const categorias = artigoAdminService.listarCategorias();
    const artigo = req.params.id ? artigoAdminService.buscarPorId(req.params.id) : null;
    res.render('admin/artigos/formulario', { titulo: 'Artigo', categorias, artigo });
}

function salvarArtigo(req, res) {
    const { categoriaId, titulo, resumo, conteudo, fonte, publicado } = req.body;
    const dados = {
        categoriaId: Number(categoriaId),
        titulo,
        resumo,
        conteudo,
        fonte,
        publicado: publicado === 'on',
    };

    if (req.params.id) {
        artigoAdminService.atualizar(req.params.id, dados);
    } else {
        artigoAdminService.criar(dados);
    }

    res.redirect('/admin/artigos');
}

function removerArtigo(req, res) {
    artigoAdminService.remover(req.params.id);
    res.redirect('/admin/artigos');
}

function listarDuvidas(req, res) {
    const pendentes = duvidaService.listarPendentes();
    const respondidas = duvidaService.listarRespondidas();
    res.render('admin/duvidas', { titulo: 'Duvidas', pendentes, respondidas });
}

function responderDuvida(req, res) {
    duvidaService.responderDuvida(req.params.id, req.body.resposta);
    res.redirect('/admin/duvidas');
}

module.exports = {
    dashboard,
    listarArtigos,
    exibirFormularioArtigo,
    salvarArtigo,
    removerArtigo,
    listarDuvidas,
    responderDuvida,
};
