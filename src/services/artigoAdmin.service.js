const artigoRepository = require('../repositories/artigo.repository');
const categoriaRepository = require('../repositories/categoria.repository');

function removerAcentos(texto) {
    return texto
        .normalize('NFD')
        .split('')
        .filter((char) => {
            const code = char.charCodeAt(0);
            return code < 0x0300 || code > 0x036f;
        })
        .join('');
}

function gerarSlug(titulo) {
    return removerAcentos(titulo.toLowerCase())
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-');
}

function listarTodos() {
    return artigoRepository.listarTodos();
}

function buscarPorId(id) {
    return artigoRepository.buscarPorId(id);
}

function listarCategorias() {
    return categoriaRepository.listarTodas();
}

function criar({ categoriaId, titulo, resumo, conteudo, fonte, publicado }) {
    const slug = gerarSlug(titulo);
    return artigoRepository.criar({
        categoriaId,
        titulo,
        slug,
        resumo,
        conteudo,
        fonte,
        publicado,
    });
}

function atualizar(id, { categoriaId, titulo, resumo, conteudo, fonte, publicado }) {
    const slug = gerarSlug(titulo);
    artigoRepository.atualizar(id, {
        categoriaId,
        titulo,
        slug,
        resumo,
        conteudo,
        fonte,
        publicado,
    });
}

function remover(id) {
    artigoRepository.remover(id);
}

module.exports = { listarTodos, buscarPorId, listarCategorias, criar, atualizar, remover };
