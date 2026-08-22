function paginaNaoEncontrada(req, res) {
    res.status(404).render('site/404', { titulo: 'Pagina nao encontrada' });
}

function tratarErro(err, req, res, next) {
    console.error(err);
    res.status(500).render('site/500', { titulo: 'Erro interno' });
}

module.exports = { paginaNaoEncontrada, tratarErro };
