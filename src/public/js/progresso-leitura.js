(function () {
    var CHAVE_LIDOS = 'progresso-leitura-lidos';

    function lerLidos() {
        try {
            var bruto = localStorage.getItem(CHAVE_LIDOS);
            var lista = bruto ? JSON.parse(bruto) : [];
            return Array.isArray(lista) ? lista : [];
        } catch (erro) {
            return [];
        }
    }

    function gravarLidos(lista) {
        try {
            localStorage.setItem(CHAVE_LIDOS, JSON.stringify(lista));
        } catch (erro) {
            // localStorage indisponivel (ex.: modo privado) - progresso nao persiste, mas a pagina continua funcional.
        }
    }

    function marcarComoLido(slug, lidos) {
        if (lidos.indexOf(slug) === -1) {
            lidos.push(slug);
            gravarLidos(lidos);
        }
        return lidos;
    }

    function atualizarBarra(container, lidos) {
        var total = parseInt(container.getAttribute('data-total'), 10) || 0;
        var texto = document.getElementById('progresso-leitura-texto');
        var barra = document.getElementById('progresso-leitura-barra');
        var preenchimento = document.getElementById('progresso-leitura-preenchimento');
        var quantidadeLida = Math.min(lidos.length, total);
        var percentual = total > 0 ? Math.round((quantidadeLida / total) * 100) : 0;

        if (texto) {
            texto.textContent = 'Você já leu ' + quantidadeLida + ' de ' + total + ' conteúdos (' + percentual + '%).';
        }
        if (barra) {
            barra.setAttribute('aria-valuenow', String(quantidadeLida));
        }
        if (preenchimento) {
            preenchimento.style.width = percentual + '%';
        }
    }

    function marcarCardsLidos(lidos) {
        var cards = document.querySelectorAll('[data-slug]');
        cards.forEach(function (card) {
            var slug = card.getAttribute('data-slug');
            var badge = card.querySelector('.badge-lido');
            if (badge && lidos.indexOf(slug) !== -1) {
                badge.hidden = false;
            }
        });
    }

    document.addEventListener('DOMContentLoaded', function () {
        var container = document.getElementById('progresso-leitura');
        if (!container) return;

        var lidos = lerLidos();

        var slugAtual = container.getAttribute('data-conteudo-atual');
        if (slugAtual) {
            lidos = marcarComoLido(slugAtual, lidos);
        }

        atualizarBarra(container, lidos);
        marcarCardsLidos(lidos);
    });
})();
