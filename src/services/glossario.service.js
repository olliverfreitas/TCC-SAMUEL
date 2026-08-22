const glossarioRepository = require('../repositories/glossario.repository');

function listarPorLetra(letra) {
    const letrasDisponiveis = glossarioRepository.listarLetrasDisponiveis();

    if (letra && letrasDisponiveis.includes(letra.toUpperCase())) {
        return {
            termos: glossarioRepository.listarPorLetra(letra),
            letraAtiva: letra.toUpperCase(),
            letrasDisponiveis,
        };
    }

    return {
        termos: glossarioRepository.listarTodos(),
        letraAtiva: null,
        letrasDisponiveis,
    };
}

module.exports = { listarPorLetra };
