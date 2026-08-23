const duvidaAdminService = require('../services/duvida-admin.service');

function listar(req, res) {
    res.render('admin/duvidas', {
        titulo: 'Dúvidas',
        pendentes: duvidaAdminService.listarPendentes(),
        respondidas: duvidaAdminService.listarRespondidas(),
        rejeitadas: duvidaAdminService.listarRejeitadas(),
        erro: null,
    });
}

function renderizarComErro(req, res, erro) {
    res.status(400).render('admin/duvidas', {
        titulo: 'Dúvidas',
        pendentes: duvidaAdminService.listarPendentes(),
        respondidas: duvidaAdminService.listarRespondidas(),
        rejeitadas: duvidaAdminService.listarRejeitadas(),
        erro,
    });
}

function responder(req, res) {
    const resultado = duvidaAdminService.responder(req.params.id, req.session.usuario.id, req.body.resposta);
    if (resultado.erro) return renderizarComErro(req, res, resultado.erro);
    res.redirect('/admin/duvidas');
}

function rejeitar(req, res) {
    const resultado = duvidaAdminService.rejeitar(req.params.id);
    if (resultado.erro) return renderizarComErro(req, res, resultado.erro);
    res.redirect('/admin/duvidas');
}

function publicar(req, res) {
    duvidaAdminService.publicar(req.params.id);
    res.redirect('/admin/duvidas');
}

function despublicar(req, res) {
    duvidaAdminService.despublicar(req.params.id);
    res.redirect('/admin/duvidas');
}

module.exports = { listar, responder, rejeitar, publicar, despublicar };
