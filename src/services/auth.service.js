const bcrypt = require('bcrypt');
const usuarioRepository = require('../repositories/usuario.repository');

async function autenticar(email, senha) {
    const usuario = usuarioRepository.buscarPorEmail(email);
    if (!usuario) return null;

    const senhaValida = await bcrypt.compare(senha, usuario.senha_hash);
    if (!senhaValida) return null;

    return { id: usuario.id, nome: usuario.nome, email: usuario.email, papel: usuario.papel };
}

module.exports = { autenticar };
