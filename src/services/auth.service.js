const bcrypt = require('bcrypt');
const adminRepository = require('../repositories/admin.repository');

async function autenticar(email, senha) {
    const admin = adminRepository.buscarPorEmail(email);
    if (!admin) return null;

    const senhaValida = await bcrypt.compare(senha, admin.senha_hash);
    if (!senhaValida) return null;

    return { id: admin.id, nome: admin.nome, email: admin.email };
}

module.exports = { autenticar };
