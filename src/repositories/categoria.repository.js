const db = require('../config/database');

function listarTodas() {
    return db.prepare('SELECT * FROM categorias ORDER BY nome').all();
}

function buscarPorSlug(slug) {
    return db.prepare('SELECT * FROM categorias WHERE slug = ?').get(slug);
}

module.exports = { listarTodas, buscarPorSlug };
