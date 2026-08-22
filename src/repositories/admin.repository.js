const db = require('../config/database');

function buscarPorEmail(email) {
    return db.prepare('SELECT * FROM admins WHERE email = ?').get(email);
}

function buscarPorId(id) {
    return db.prepare('SELECT * FROM admins WHERE id = ?').get(id);
}

module.exports = { buscarPorEmail, buscarPorId };
