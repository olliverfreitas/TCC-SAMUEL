const authService = require('../services/auth.service');

function exibirLogin(req, res) {
    if (req.session.usuario) return res.redirect('/admin');
    res.render('admin/login', { titulo: 'Login', erro: null });
}

async function login(req, res) {
    const { email, senha } = req.body;
    const usuario = await authService.autenticar(email, senha);

    if (!usuario) {
        return res.status(401).render('admin/login', { titulo: 'Login', erro: 'Credenciais inválidas' });
    }

    req.session.usuario = usuario;
    res.redirect('/admin');
}

function logout(req, res) {
    req.session.destroy(() => {
        res.redirect('/admin/login');
    });
}

module.exports = { exibirLogin, login, logout };
