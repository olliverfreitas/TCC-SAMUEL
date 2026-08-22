const db = require('../config/database');

function criar(pergunta) {
    const info = db.prepare('INSERT INTO duvidas (pergunta) VALUES (?)').run(pergunta);
    return info.lastInsertRowid;
}

function listarTodas() {
    return db.prepare('SELECT * FROM duvidas ORDER BY criado_em DESC').all();
}

function listarPorStatus(status) {
    return db.prepare('SELECT * FROM duvidas WHERE status = ? ORDER BY criado_em DESC').all(status);
}

function buscarPorId(id) {
    return db.prepare('SELECT * FROM duvidas WHERE id = ?').get(id);
}

function responder(id, resposta) {
    db.prepare(
        `UPDATE duvidas
         SET resposta = ?, status = 'respondida', respondido_em = datetime('now')
         WHERE id = ?`
    ).run(resposta, id);
}

module.exports = { criar, listarTodas, listarPorStatus, buscarPorId, responder };
