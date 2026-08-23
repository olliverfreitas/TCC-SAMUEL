const sanitizeHtml = require('sanitize-html');
const conteudoRepository = require('../repositories/conteudo.repository');
const categoriaRepository = require('../repositories/categoria.repository');

const OPCOES_SANITIZACAO = {
    allowedTags: ['p', 'strong', 'em', 'ul', 'ol', 'li', 'a', 'h2', 'h3', 'br'],
    allowedAttributes: { a: ['href'] },
};

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

function gerarSlugBase(titulo) {
    return removerAcentos(titulo.toLowerCase())
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-');
}

function gerarSlugUnico(titulo, idExcluir) {
    const base = gerarSlugBase(titulo);
    let slug = base;
    let contador = 2;

    while (conteudoRepository.existeSlug(slug, idExcluir)) {
        slug = `${base}-${contador}`;
        contador += 1;
    }

    return slug;
}

function listarTodos() {
    return conteudoRepository.listarTodosAdmin();
}

function buscarPorId(id) {
    return conteudoRepository.buscarPorId(id);
}

function listarCategorias() {
    return categoriaRepository.listarTodas();
}

function criar(dados) {
    const slug = gerarSlugUnico(dados.titulo, null);
    return conteudoRepository.criar({
        categoriaId: dados.categoriaId,
        titulo: dados.titulo,
        slug,
        resumo: dados.resumo,
        corpoHtml: sanitizeHtml(dados.corpoHtml, OPCOES_SANITIZACAO),
        fontes: dados.fontes,
        faixaEtaria: dados.faixaEtaria,
        publicado: dados.publicado,
    });
}

function atualizar(id, dados) {
    const slug = gerarSlugUnico(dados.titulo, id);
    conteudoRepository.atualizar(id, {
        categoriaId: dados.categoriaId,
        titulo: dados.titulo,
        slug,
        resumo: dados.resumo,
        corpoHtml: sanitizeHtml(dados.corpoHtml, OPCOES_SANITIZACAO),
        fontes: dados.fontes,
        faixaEtaria: dados.faixaEtaria,
        publicado: dados.publicado,
    });
}

function remover(id) {
    conteudoRepository.remover(id);
}

module.exports = { listarTodos, buscarPorId, listarCategorias, criar, atualizar, remover };
