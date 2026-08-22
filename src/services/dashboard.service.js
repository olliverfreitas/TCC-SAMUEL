const conteudoRepository = require('../repositories/conteudo.repository');
const duvidaRepository = require('../repositories/duvida.repository');

function montarContadores() {
    return {
        totalConteudos: conteudoRepository.contarTotal(),
        publicados: conteudoRepository.contarPorPublicado(true),
        rascunhos: conteudoRepository.contarPorPublicado(false),
        duvidasPendentes: duvidaRepository.contarPendentes(),
    };
}

module.exports = { montarContadores };
