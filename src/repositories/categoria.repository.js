const db = require('../config/database');

function listarTodas() {
    return db.prepare('SELECT * FROM categoria ORDER BY nome').all();
}

function buscarPorSlug(slug) {
    return db.prepare('SELECT * FROM categoria WHERE slug = ?').get(slug);
}

module.exports = { listarTodas, buscarPorSlug };
