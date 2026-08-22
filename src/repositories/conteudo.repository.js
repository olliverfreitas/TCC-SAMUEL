const db = require('../config/database');

function listarPublicadosRecentes(limite) {
    return db
        .prepare(
            `SELECT conteudo.*, categoria.nome AS categoria_nome, categoria.slug AS categoria_slug
             FROM conteudo
             JOIN categoria ON categoria.id = conteudo.categoria_id
             WHERE conteudo.publicado = 1
             ORDER BY conteudo.criado_em DESC
             LIMIT ?`
        )
        .all(limite);
}

module.exports = { listarPublicadosRecentes };
