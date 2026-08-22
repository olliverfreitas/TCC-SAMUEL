function requireAuth(req, res, next) {
    if (!req.session.usuario) {
        return res.redirect('/admin/login');
    }
    next();
}

function requireRole(...papeis) {
    return function (req, res, next) {
        if (!req.session.usuario) {
            return res.redirect('/admin/login');
        }
        if (!papeis.includes(req.session.usuario.papel)) {
            return res.status(403).render('site/403', { titulo: 'Acesso negado' });
        }
        next();
    };
}

module.exports = { requireAuth, requireRole };
