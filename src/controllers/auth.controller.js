const authService = require('../services/auth.service');

function exibirLogin(req, res) {
    if (req.session.admin) return res.redirect('/admin');
    res.render('admin/login', { titulo: 'Login', erro: null });
}

async function login(req, res) {
    const { email, senha } = req.body;
    const admin = await authService.autenticar(email, senha);

    if (!admin) {
        return res.status(401).render('admin/login', { titulo: 'Login', erro: 'Credenciais invalidas' });
    }

    req.session.admin = admin;
    res.redirect('/admin');
}

function logout(req, res) {
    req.session.destroy(() => {
        res.redirect('/admin/login');
    });
}

module.exports = { exibirLogin, login, logout };
