const duvidaRepository = require('../repositories/duvida.repository');

function enviarDuvida(pergunta) {
    return duvidaRepository.criar(pergunta.trim());
}

function listarPendentes() {
    return duvidaRepository.listarPorStatus('pendente');
}

function listarRespondidas() {
    return duvidaRepository.listarPorStatus('respondida');
}

function responderDuvida(id, resposta) {
    const duvida = duvidaRepository.buscarPorId(id);
    if (!duvida) throw new Error('Duvida nao encontrada');
    duvidaRepository.responder(id, resposta.trim());
}

module.exports = { enviarDuvida, listarPendentes, listarRespondidas, responderDuvida };
