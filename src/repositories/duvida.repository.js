const db = require('../config/database');

function contarPendentes() {
    const { total } = db.prepare("SELECT COUNT(*) AS total FROM duvida WHERE status = 'pendente'").get();
    return total;
}

function criar(pergunta) {
    const info = db.prepare('INSERT INTO duvida (pergunta) VALUES (?)').run(pergunta);
    return info.lastInsertRowid;
}

function listarPorStatus(status) {
    return db.prepare('SELECT * FROM duvida WHERE status = ? ORDER BY criado_em DESC').all(status);
}

function buscarPorId(id) {
    return db.prepare('SELECT * FROM duvida WHERE id = ?').get(id);
}

function atualizarStatus(id, status) {
    db.prepare('UPDATE duvida SET status = ? WHERE id = ?').run(status, id);
}

function marcarPublicada(id, publicada) {
    db.prepare('UPDATE duvida SET publicada = ? WHERE id = ?').run(publicada ? 1 : 0, id);
}

function listarFaqPublicado() {
    return db
        .prepare(
            `SELECT duvida.id, duvida.pergunta, resposta_duvida.resposta, duvida.criado_em
             FROM duvida
             JOIN resposta_duvida ON resposta_duvida.duvida_id = duvida.id
             WHERE duvida.status = 'respondida' AND duvida.publicada = 1
             ORDER BY duvida.criado_em DESC`
        )
        .all();
}

module.exports = {
    contarPendentes,
    criar,
    listarPorStatus,
    buscarPorId,
    atualizarStatus,
    marcarPublicada,
    listarFaqPublicado,
};
