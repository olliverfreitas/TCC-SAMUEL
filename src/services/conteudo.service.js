const categoriaRepository = require('../repositories/categoria.repository');
const artigoRepository = require('../repositories/artigo.repository');

function listarCategorias() {
    return categoriaRepository.listarTodas();
}

function listarArtigosPublicados() {
    return artigoRepository.listarPublicados();
}

function buscarCategoriaComArtigos(slug) {
    const categoria = categoriaRepository.buscarPorSlug(slug);
    if (!categoria) return null;
    const artigos = artigoRepository.listarPorCategoria(categoria.id);
    return { categoria, artigos };
}

function buscarArtigoPorSlug(slug) {
    return artigoRepository.buscarPorSlug(slug);
}

module.exports = {
    listarCategorias,
    listarArtigosPublicados,
    buscarCategoriaComArtigos,
    buscarArtigoPorSlug,
};
