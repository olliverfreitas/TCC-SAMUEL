// Prepara um banco SQLite temporario e isolado para os testes automatizados.
// Cada arquivo de teste roda em processo proprio (node --test isola por arquivo),
// entao definir DB_PATH aqui, antes de qualquer require de repository/service,
// garante que o singleton em src/config/database.js abra o banco de teste,
// nunca o banco real de desenvolvimento.
const fs = require('fs');
const os = require('os');
const path = require('path');

function prepararBancoTemporario() {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'tcc-teste-'));
    process.env.DB_PATH = path.join(dir, 'teste.sqlite');
    process.env.NODE_ENV = 'test';
    process.env.SESSION_SECRET = process.env.SESSION_SECRET || 'segredo-de-teste';

    const db = require('../../src/config/database');
    const schema = fs.readFileSync(path.join(__dirname, '..', '..', 'database', 'schema.sql'), 'utf8');
    db.exec(schema);
    return db;
}

module.exports = { prepararBancoTemporario };
