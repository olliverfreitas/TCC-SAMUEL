const db = require('../config/database');

function buscarPorEmail(email) {
    return db.prepare('SELECT * FROM usuario WHERE email = ?').get(email);
}

module.exports = { buscarPorEmail };
