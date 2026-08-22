const db = require('../config/database');

function listarPerguntas() {
    const perguntas = db.prepare('SELECT * FROM quiz_perguntas ORDER BY ordem, id').all();
    const opcoesStmt = db.prepare('SELECT * FROM quiz_opcoes WHERE pergunta_id = ?');
    return perguntas.map((pergunta) => ({
        ...pergunta,
        opcoes: opcoesStmt.all(pergunta.id),
    }));
}

function buscarPergunta(id) {
    return db.prepare('SELECT * FROM quiz_perguntas WHERE id = ?').get(id);
}

function listarOpcoesPorPergunta(perguntaId) {
    return db.prepare('SELECT * FROM quiz_opcoes WHERE pergunta_id = ?').all(perguntaId);
}

module.exports = { listarPerguntas, buscarPergunta, listarOpcoesPorPergunta };
