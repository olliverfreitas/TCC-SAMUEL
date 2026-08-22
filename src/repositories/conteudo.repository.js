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

function montarFiltros({ categoriaSlug, faixaEtaria, busca }) {
    const condicoes = ['conteudo.publicado = 1'];
    const params = [];

    if (categoriaSlug) {
        condicoes.push('categoria.slug = ?');
        params.push(categoriaSlug);
    }

    if (faixaEtaria) {
        condicoes.push('conteudo.faixa_etaria = ?');
        params.push(faixaEtaria);
    }

    if (busca) {
        condicoes.push('(conteudo.titulo LIKE ? OR conteudo.resumo LIKE ?)');
        const termo = `%${busca}%`;
        params.push(termo, termo);
    }

    return { clausula: condicoes.join(' AND '), params };
}

function listarComFiltros({ categoriaSlug, faixaEtaria, busca, pagina, porPagina }) {
    const { clausula, params } = montarFiltros({ categoriaSlug, faixaEtaria, busca });
    const offset = (pagina - 1) * porPagina;

    return db
        .prepare(
            `SELECT conteudo.*, categoria.nome AS categoria_nome, categoria.slug AS categoria_slug
             FROM conteudo
             JOIN categoria ON categoria.id = conteudo.categoria_id
             WHERE ${clausula}
             ORDER BY conteudo.criado_em DESC
             LIMIT ? OFFSET ?`
        )
        .all(...params, porPagina, offset);
}

function contarComFiltros({ categoriaSlug, faixaEtaria, busca }) {
    const { clausula, params } = montarFiltros({ categoriaSlug, faixaEtaria, busca });

    const { total } = db
        .prepare(
            `SELECT COUNT(*) AS total
             FROM conteudo
             JOIN categoria ON categoria.id = conteudo.categoria_id
             WHERE ${clausula}`
        )
        .get(...params);

    return total;
}

function buscarPorSlugPublicado(slug) {
    return db
        .prepare(
            `SELECT conteudo.*, categoria.nome AS categoria_nome, categoria.slug AS categoria_slug
             FROM conteudo
             JOIN categoria ON categoria.id = conteudo.categoria_id
             WHERE conteudo.slug = ? AND conteudo.publicado = 1`
        )
        .get(slug);
}

function incrementarVisualizacoes(id) {
    db.prepare('UPDATE conteudo SET visualizacoes = visualizacoes + 1 WHERE id = ?').run(id);
}

function listarRelacionados(categoriaId, idExcluir, limite) {
    return db
        .prepare(
            `SELECT conteudo.*, categoria.nome AS categoria_nome, categoria.slug AS categoria_slug
             FROM conteudo
             JOIN categoria ON categoria.id = conteudo.categoria_id
             WHERE conteudo.categoria_id = ? AND conteudo.id != ? AND conteudo.publicado = 1
             ORDER BY conteudo.criado_em DESC
             LIMIT ?`
        )
        .all(categoriaId, idExcluir, limite);
}

module.exports = {
    listarPublicadosRecentes,
    listarComFiltros,
    contarComFiltros,
    buscarPorSlugPublicado,
    incrementarVisualizacoes,
    listarRelacionados,
};
