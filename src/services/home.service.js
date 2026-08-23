const categoriaRepository = require('../repositories/categoria.repository');
const conteudoRepository = require('../repositories/conteudo.repository');

const LIMITE_CONTEUDOS_RECENTES = 8;

function montarDadosHome() {
    return {
        categorias: categoriaRepository.listarTodas(),
        conteudosRecentes: conteudoRepository.listarPublicadosRecentes(LIMITE_CONTEUDOS_RECENTES),
    };
}

module.exports = { montarDadosHome };
