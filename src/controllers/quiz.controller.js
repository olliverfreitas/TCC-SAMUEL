const quizPlayerService = require('../services/quiz-player.service');

function player(req, res) {
    const dados = quizPlayerService.buscarParaPlayer(req.params.id);
    if (!dados) {
        return res.status(404).render('site/404', { titulo: 'Página não encontrada' });
    }
    res.render('site/quiz', { titulo: dados.quiz.titulo, ...dados });
}

function responder(req, res) {
    const quizId = req.params.id;
    const quiz = quizPlayerService.buscarParaPlayer(quizId);
    if (!quiz) {
        return res.status(404).json({ erro: 'Quiz não encontrado.' });
    }

    const respostas = req.body.respostas || {};
    const usuarioId = req.session.usuario ? req.session.usuario.id : null;
    const resultado = quizPlayerService.corrigir(quizId, respostas, usuarioId);

    res.json(resultado);
}

module.exports = { player, responder };
