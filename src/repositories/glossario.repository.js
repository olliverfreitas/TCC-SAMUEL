const db = require('../config/database');

function listarPorLetra(letra) {
    return db
        .prepare('SELECT * FROM glossario WHERE UPPER(SUBSTR(termo, 1, 1)) = ? ORDER BY termo')
        .all(letra.toUpperCase());
}

function listarTodos() {
    return db.prepare('SELECT * FROM glossario ORDER BY termo').all();
}

function listarLetrasDisponiveis() {
    const linhas = db
        .prepare('SELECT DISTINCT UPPER(SUBSTR(termo, 1, 1)) AS letra FROM glossario ORDER BY letra')
        .all();
    return linhas.map((linha) => linha.letra);
}

module.exports = { listarPorLetra, listarTodos, listarLetrasDisponiveis };
