// Cobre a marcacao da pagina atual no menu principal (aria-current="page"), que
// e' o que diz ao leitor de tela onde a pessoa esta. Renderiza so o partial.
const { test } = require('node:test');
const assert = require('node:assert/strict');
const path = require('path');
const ejs = require('ejs');

const CABECALHO = path.join(__dirname, '..', 'src', 'views', 'partials', 'header.ejs');

function renderizar(locals) {
    return ejs.renderFile(CABECALHO, locals, { async: false });
}

function linksAtuais(html) {
    return [...html.matchAll(/<a [^>]*aria-current="page"[^>]*>([^<]+)<\/a>/g)].map((m) => m[1]);
}

test('marca so o item da secao atual, inclusive em subpaginas', async () => {
    const html = await renderizar({ caminhoAtual: '/conteudos/mitos-e-verdades-sobre-a-pilula' });

    assert.deepEqual(linksAtuais(html), ['Conteúdos']);
});

test('o quiz fica marcado em qualquer /quiz/:id', async () => {
    const html = await renderizar({ caminhoAtual: '/quiz/3' });

    assert.deepEqual(linksAtuais(html), ['Quiz']);
});

test('na pagina de duvidas, a marcacao vai para o botao de destaque', async () => {
    const html = await renderizar({ caminhoAtual: '/duvidas' });

    assert.deepEqual(linksAtuais(html), ['Fazer uma pergunta']);
});

test('sem caminho (vitrine estatica) nenhum item fica marcado', async () => {
    const html = await renderizar({});

    assert.deepEqual(linksAtuais(html), []);
});

test('prefixo parecido nao conta como a mesma secao', async () => {
    // "/sobremesa" comeca com "/sobre", mas nao e' a pagina Sobre.
    const html = await renderizar({ caminhoAtual: '/sobremesa' });

    assert.deepEqual(linksAtuais(html), []);
});
