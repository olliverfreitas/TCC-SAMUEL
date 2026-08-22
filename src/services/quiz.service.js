const quizRepository = require('../repositories/quiz.repository');

function listarPerguntasParaExibicao() {
    const perguntas = quizRepository.listarPerguntas();
    return perguntas.map((pergunta) => ({
        id: pergunta.id,
        enunciado: pergunta.enunciado,
        opcoes: pergunta.opcoes.map((opcao) => ({ id: opcao.id, texto: opcao.texto })),
    }));
}

function corrigir(respostas) {
    const perguntas = quizRepository.listarPerguntas();
    let acertos = 0;

    const resultado = perguntas.map((pergunta) => {
        const opcaoCorreta = pergunta.opcoes.find((opcao) => opcao.correta === 1);
        const opcaoEscolhidaId = Number(respostas[pergunta.id]);
        const acertou = opcaoEscolhidaId === opcaoCorreta.id;
        if (acertou) acertos += 1;

        return {
            perguntaId: pergunta.id,
            enunciado: pergunta.enunciado,
            explicacao: pergunta.explicacao,
            acertou,
            opcaoCorreta: opcaoCorreta.texto,
        };
    });

    return { total: perguntas.length, acertos, resultado };
}

module.exports = { listarPerguntasParaExibicao, corrigir };
