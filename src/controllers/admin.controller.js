const { validationResult } = require('express-validator');
const dashboardService = require('../services/dashboard.service');
const conteudoAdminService = require('../services/conteudo-admin.service');

function dashboard(req, res) {
    const contadores = dashboardService.montarContadores();
    res.render('admin/dashboard', { titulo: 'Painel administrativo', ...contadores });
}

function listarConteudos(req, res) {
    const conteudos = conteudoAdminService.listarTodos();
    res.render('admin/conteudos/lista', { titulo: 'Conteúdos', conteudos });
}

function exibirFormularioConteudo(req, res) {
    const categorias = conteudoAdminService.listarCategorias();
    const conteudo = req.params.id ? conteudoAdminService.buscarPorId(req.params.id) : null;

    if (req.params.id && !conteudo) {
        return res.status(404).render('site/404', { titulo: 'Página não encontrada' });
    }

    res.render('admin/conteudos/formulario', { titulo: 'Conteúdo', categorias, conteudo, erros: [] });
}

function salvarConteudo(req, res) {
    const erros = validationResult(req);

    if (!erros.isEmpty()) {
        const categorias = conteudoAdminService.listarCategorias();
        const conteudo = req.params.id ? { id: req.params.id, ...req.body } : req.body;
        return res.status(400).render('admin/conteudos/formulario', {
            titulo: 'Conteúdo',
            categorias,
            conteudo,
            erros: erros.array(),
        });
    }

    const dados = {
        categoriaId: Number(req.body.categoriaId),
        titulo: req.body.titulo,
        resumo: req.body.resumo,
        corpoHtml: req.body.corpoHtml,
        fontes: req.body.fontes,
        faixaEtaria: req.body.faixaEtaria,
        publicado: req.body.publicado === 'on',
    };

    if (req.params.id) {
        conteudoAdminService.atualizar(req.params.id, dados);
    } else {
        conteudoAdminService.criar(dados);
    }

    res.redirect('/admin/conteudos');
}

function removerConteudo(req, res) {
    conteudoAdminService.remover(req.params.id);
    res.redirect('/admin/conteudos');
}

module.exports = {
    dashboard,
    listarConteudos,
    exibirFormularioConteudo,
    salvarConteudo,
    removerConteudo,
};
