(function () {
    var NIVEIS_FONTE = ['normal', 'grande', 'enorme'];
    var CHAVE_FONTE = 'acessibilidade-fonte';
    var CHAVE_CONTRASTE = 'acessibilidade-contraste';

    function lerLocalStorage(chave) {
        try {
            return localStorage.getItem(chave);
        } catch (erro) {
            return null;
        }
    }

    function gravarLocalStorage(chave, valor) {
        try {
            localStorage.setItem(chave, valor);
        } catch (erro) {
            // localStorage indisponivel (ex.: modo privado) - preferencia nao persiste, mas a pagina continua funcional.
        }
    }

    function nivelAtual() {
        var salvo = lerLocalStorage(CHAVE_FONTE);
        var indice = NIVEIS_FONTE.indexOf(salvo);
        return indice === -1 ? 0 : indice;
    }

    function aplicarFonte(nivel) {
        NIVEIS_FONTE.forEach(function (nome) {
            document.documentElement.classList.remove('fonte-' + nome);
        });
        if (NIVEIS_FONTE[nivel] !== 'normal') {
            document.documentElement.classList.add('fonte-' + NIVEIS_FONTE[nivel]);
        }
        gravarLocalStorage(CHAVE_FONTE, NIVEIS_FONTE[nivel]);
    }

    function alternarContraste() {
        var ativo = document.documentElement.classList.toggle('alto-contraste');
        gravarLocalStorage(CHAVE_CONTRASTE, ativo ? 'on' : 'off');
        var botao = document.getElementById('btn-alto-contraste');
        if (botao) botao.setAttribute('aria-pressed', String(ativo));
    }

    document.addEventListener('DOMContentLoaded', function () {
        var botaoDiminuir = document.getElementById('btn-fonte-diminuir');
        var botaoAumentar = document.getElementById('btn-fonte-aumentar');
        var botaoContraste = document.getElementById('btn-alto-contraste');

        if (botaoContraste) {
            var contrasteAtivo = lerLocalStorage(CHAVE_CONTRASTE) === 'on';
            botaoContraste.setAttribute('aria-pressed', String(contrasteAtivo));
            botaoContraste.addEventListener('click', alternarContraste);
        }

        if (botaoDiminuir) {
            botaoDiminuir.addEventListener('click', function () {
                aplicarFonte(Math.max(0, nivelAtual() - 1));
            });
        }

        if (botaoAumentar) {
            botaoAumentar.addEventListener('click', function () {
                aplicarFonte(Math.min(NIVEIS_FONTE.length - 1, nivelAtual() + 1));
            });
        }
    });
})();
