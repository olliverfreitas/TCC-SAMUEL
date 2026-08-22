const db = require('../config/database');

function criar(duvidaId, usuarioId, resposta) {
    db.prepare('INSERT INTO resposta_duvida (duvida_id, usuario_id, resposta) VALUES (?, ?, ?)').run(
        duvidaId,
        usuarioId,
        resposta
    );
}

function buscarPorDuvidaId(duvidaId) {
    return db.prepare('SELECT * FROM resposta_duvida WHERE duvida_id = ?').get(duvidaId);
}

module.exports = { criar, buscarPorDuvidaId };
