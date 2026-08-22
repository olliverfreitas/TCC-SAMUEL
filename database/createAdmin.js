const path = require('path');
const bcrypt = require('bcrypt');
const Database = require('better-sqlite3');

const [, , nome, email, senha] = process.argv;

if (!nome || !email || !senha) {
    console.error('Uso: node database/createAdmin.js "Nome" email@exemplo.com senha');
    process.exit(1);
}

const dbPath = path.join(__dirname, 'database.sqlite');
const db = new Database(dbPath);

const senhaHash = bcrypt.hashSync(senha, 10);

db.prepare('INSERT INTO admins (nome, email, senha_hash) VALUES (?, ?, ?)').run(nome, email, senhaHash);

db.close();
console.log('Admin criado:', email);
