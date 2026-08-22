const db = require('../config/database');

function contarPendentes() {
    const { total } = db.prepare("SELECT COUNT(*) AS total FROM duvida WHERE status = 'pendente'").get();
    return total;
}

module.exports = { contarPendentes };
