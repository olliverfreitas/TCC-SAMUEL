const conteudoRepository = require('../repositories/conteudo.repository');
const categoriaRepository = require('../repositories/categoria.repository');

const ITENS_POR_PAGINA = 12;
const LIMITE_RELACIONADOS = 3;
const PALAVRAS_POR_MINUTO = 200;

const FAIXAS_ETARIAS_VALIDAS = ['adolescente', 'adulto', 'todas'];

function normalizarFiltros(query) {
    const categoriaSlug = query.categoria || null;
    const faixaEtaria = FAIXAS_ETARIAS_VALIDAS.includes(query.faixa) ? query.faixa : null;
    const busca = query.q ? query.q.trim() : null;
    const pagina = Math.max(1, parseInt(query.pagina, 10) || 1);

    return { categoriaSlug, faixaEtaria, busca, pagina };
}

function listarCatalogo(query) {
    const filtros = normalizarFiltros(query);

    const total = conteudoRepository.contarComFiltros(filtros);
    const totalPaginas = Math.max(1, Math.ceil(total / ITENS_POR_PAGINA));
    const paginaAtual = Math.min(filtros.pagina, totalPaginas);

    const itens = conteudoRepository.listarComFiltros({
        ...filtros,
        pagina: paginaAtual,
        porPagina: ITENS_POR_PAGINA,
    });

    return {
        itens,
        paginaAtual,
        totalPaginas,
        categorias: categoriaRepository.listarTodas(),
        totalPublicados: conteudoRepository.contarPorPublicado(true),
        filtrosAtivos: {
            categoria: filtros.categoriaSlug || '',
            faixa: filtros.faixaEtaria || '',
            q: filtros.busca || '',
        },
    };
}

function calcularTempoLeituraMinutos(corpoHtml) {
    const texto = corpoHtml.replace(/<[^>]*>/g, ' ');
    const palavras = texto.trim().split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.ceil(palavras / PALAVRAS_POR_MINUTO));
}

function buscarDetalhe(slug) {
    const conteudo = conteudoRepository.buscarPorSlugPublicado(slug);
    if (!conteudo) return null;

    conteudoRepository.incrementarVisualizacoes(conteudo.id);

    return {
        conteudo,
        tempoLeituraMinutos: calcularTempoLeituraMinutos(conteudo.corpo_html),
        relacionados: conteudoRepository.listarRelacionados(conteudo.categoria_id, conteudo.id, LIMITE_RELACIONADOS),
        totalPublicados: conteudoRepository.contarPorPublicado(true),
    };
}

module.exports = { listarCatalogo, buscarDetalhe };
