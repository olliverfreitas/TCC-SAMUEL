const homeService = require('../services/home.service');

function home(req, res) {
    const dados = homeService.montarDadosHome();
    res.render('site/home', { titulo: 'Inicio', ...dados });
}

function sobre(req, res) {
    res.render('site/sobre', { titulo: 'Sobre' });
}

module.exports = { home, sobre };
