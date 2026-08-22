const duvidaRepository = require('../repositories/duvida.repository');
const respostaDuvidaRepository = require('../repositories/resposta-duvida.repository');

function listarPendentes() {
    return duvidaRepository.listarPorStatus('pendente');
}

function listarRespondidas() {
    return duvidaRepository.listarPorStatus('respondida').map((duvida) => ({
        ...duvida,
        resposta: respostaDuvidaRepository.buscarPorDuvidaId(duvida.id),
    }));
}

function listarRejeitadas() {
    return duvidaRepository.listarPorStatus('rejeitada');
}

function responder(duvidaId, usuarioId, resposta) {
    const duvida = duvidaRepository.buscarPorId(duvidaId);
    if (!duvida || duvida.status !== 'pendente') return { erro: 'Dúvida não encontrada ou já moderada.' };

    const texto = (resposta || '').trim();
    if (!texto) return { erro: 'Informe a resposta.' };

    respostaDuvidaRepository.criar(duvidaId, usuarioId, texto);
    duvidaRepository.atualizarStatus(duvidaId, 'respondida');
    return { erro: null };
}

function rejeitar(duvidaId) {
    const duvida = duvidaRepository.buscarPorId(duvidaId);
    if (!duvida || duvida.status !== 'pendente') return { erro: 'Dúvida não encontrada ou já moderada.' };

    duvidaRepository.atualizarStatus(duvidaId, 'rejeitada');
    return { erro: null };
}

function publicar(duvidaId) {
    duvidaRepository.marcarPublicada(duvidaId, true);
}

function despublicar(duvidaId) {
    duvidaRepository.marcarPublicada(duvidaId, false);
}

module.exports = {
    listarPendentes,
    listarRespondidas,
    listarRejeitadas,
    responder,
    rejeitar,
    publicar,
    despublicar,
};
