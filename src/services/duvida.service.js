const duvidaRepository = require('../repositories/duvida.repository');

const PALAVRAS_BLOQUEADAS = [
    'porra',
    'caralho',
    'merda',
    'buceta',
    'viado',
    'puta',
    'idiota',
    'imbecil',
];

const REGEX_URL = /https?:\/\/|www\./i;
const REGEX_CARACTER_REPETIDO = /(.)\1{4,}/;

function contemConteudoBloqueado(texto) {
    const textoNormalizado = texto.toLowerCase();

    if (REGEX_URL.test(textoNormalizado)) return true;
    if (REGEX_CARACTER_REPETIDO.test(textoNormalizado)) return true;

    return PALAVRAS_BLOQUEADAS.some((palavra) => textoNormalizado.includes(palavra));
}

function enviarDuvida(pergunta) {
    const texto = (pergunta || '').trim();

    if (!texto) {
        return { erro: 'Escreva sua dúvida.' };
    }

    if (texto.length > 1000) {
        return { erro: 'Sua dúvida deve ter no máximo 1000 caracteres.' };
    }

    if (contemConteudoBloqueado(texto)) {
        return { erro: 'Sua dúvida contém termos ou conteúdo não permitido. Reescreva de forma respeitosa e sem links.' };
    }

    const id = duvidaRepository.criar(texto);
    return { erro: null, id };
}

function listarFaqPublicado() {
    return duvidaRepository.listarFaqPublicado();
}

module.exports = { enviarDuvida, listarFaqPublicado };
