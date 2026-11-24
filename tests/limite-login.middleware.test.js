// Cobre a proteção contra força bruta no login do admin (express-rate-limit).
// Sobe um Express mínimo numa porta aleatória, com uma rota de login falsa que
// aceita só a senha "certa", e dispara requisições reais com fetch.
const { test } = require('node:test');
const assert = require('node:assert/strict');
const path = require('path');
const express = require('express');
const { limitarLoginPorIp } = require('../src/middlewares/limite-login.middleware');

async function subirServidor(opcoes) {
    const app = express();
    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, '..', 'src', 'views'));
    app.use(express.urlencoded({ extended: true }));

    app.post('/login', limitarLoginPorIp(opcoes), (req, res) => {
        if (req.body.senha === 'certa') return res.redirect('/admin');
        res.status(401).send('Credenciais inválidas');
    });

    const servidor = app.listen(0);
    await new Promise((resolve) => servidor.once('listening', resolve));
    const url = `http://127.0.0.1:${servidor.address().port}/login`;
    return { servidor, url };
}

function tentarLogin(url, senha) {
    return fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `senha=${senha}`,
        redirect: 'manual',
    });
}

test('bloqueia com 429 depois de esgotar as tentativas erradas', async (t) => {
    const { servidor, url } = await subirServidor({ maxTentativas: 3, janelaMs: 60000 });
    t.after(() => servidor.close());

    for (let i = 0; i < 3; i += 1) {
        const resposta = await tentarLogin(url, 'errada');
        assert.equal(resposta.status, 401);
    }

    const bloqueada = await tentarLogin(url, 'errada');
    assert.equal(bloqueada.status, 429);
    assert.match(await bloqueada.text(), /Muitas tentativas de login/);
});

test('bloqueia inclusive a senha certa depois do limite', async (t) => {
    // Sem isso o atacante continuaria testando senhas e só "descobriria" a certa
    // quando ela passasse — o bloqueio tem que valer para qualquer tentativa.
    const { servidor, url } = await subirServidor({ maxTentativas: 2, janelaMs: 60000 });
    t.after(() => servidor.close());

    await tentarLogin(url, 'errada');
    await tentarLogin(url, 'errada');

    const resposta = await tentarLogin(url, 'certa');
    assert.equal(resposta.status, 429);
});

test('login certo não consome tentativas', async (t) => {
    const { servidor, url } = await subirServidor({ maxTentativas: 2, janelaMs: 60000 });
    t.after(() => servidor.close());

    for (let i = 0; i < 5; i += 1) {
        const resposta = await tentarLogin(url, 'certa');
        assert.equal(resposta.status, 302);
    }

    const errada = await tentarLogin(url, 'errada');
    assert.equal(errada.status, 401);
});
