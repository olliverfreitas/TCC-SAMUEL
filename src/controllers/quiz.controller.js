const quizService = require('../services/quiz.service');

function exibir(req, res) {
    const perguntas = quizService.listarPerguntasParaExibicao();
    res.render('site/quiz', { titulo: 'Quiz', perguntas });
}

function corrigir(req, res) {
    const resultado = quizService.corrigir(req.body);
    res.render('site/quiz-resultado', { titulo: 'Resultado do quiz', resultado });
}

module.exports = { exibir, corrigir };
