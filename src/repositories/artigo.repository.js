const db = require('../config/database');

function listarPublicados() {
    return db
        .prepare(
            `SELECT artigos.*, categorias.nome AS categoria_nome, categorias.slug AS categoria_slug
             FROM artigos
             JOIN categorias ON categorias.id = artigos.categoria_id
             WHERE artigos.publicado = 1
             ORDER BY artigos.criado_em DESC`
        )
        .all();
}

function listarPorCategoria(categoriaId) {
    return db
        .prepare('SELECT * FROM artigos WHERE categoria_id = ? AND publicado = 1 ORDER BY criado_em DESC')
        .all(categoriaId);
}

function buscarPorSlug(slug) {
    return db
        .prepare(
            `SELECT artigos.*, categorias.nome AS categoria_nome, categorias.slug AS categoria_slug
             FROM artigos
             JOIN categorias ON categorias.id = artigos.categoria_id
             WHERE artigos.slug = ?`
        )
        .get(slug);
}

function listarTodos() {
    return db
        .prepare(
            `SELECT artigos.*, categorias.nome AS categoria_nome
             FROM artigos
             JOIN categorias ON categorias.id = artigos.categoria_id
             ORDER BY artigos.criado_em DESC`
        )
        .all();
}

function buscarPorId(id) {
    return db.prepare('SELECT * FROM artigos WHERE id = ?').get(id);
}

function criar({ categoriaId, titulo, slug, resumo, conteudo, fonte, publicado }) {
    const info = db
        .prepare(
            `INSERT INTO artigos (categoria_id, titulo, slug, resumo, conteudo, fonte, publicado)
             VALUES (?, ?, ?, ?, ?, ?, ?)`
        )
        .run(categoriaId, titulo, slug, resumo, conteudo, fonte, publicado ? 1 : 0);
    return info.lastInsertRowid;
}

function atualizar(id, { categoriaId, titulo, slug, resumo, conteudo, fonte, publicado }) {
    db.prepare(
        `UPDATE artigos
         SET categoria_id = ?, titulo = ?, slug = ?, resumo = ?, conteudo = ?, fonte = ?, publicado = ?,
             atualizado_em = datetime('now')
         WHERE id = ?`
    ).run(categoriaId, titulo, slug, resumo, conteudo, fonte, publicado ? 1 : 0, id);
}

function remover(id) {
    db.prepare('DELETE FROM artigos WHERE id = ?').run(id);
}

module.exports = {
    listarPublicados,
    listarPorCategoria,
    buscarPorSlug,
    listarTodos,
    buscarPorId,
    criar,
    atualizar,
    remover,
};
