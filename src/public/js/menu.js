// Abre e fecha o menu principal em telas estreitas. Sem JavaScript o botao nem
// aparece e o menu fica sempre aberto (ver .com-js no main.css), entao a
// navegacao nunca depende deste arquivo.
(function () {
    document.addEventListener('DOMContentLoaded', function () {
        var botao = document.querySelector('.site-header__botao-menu');
        var menu = document.getElementById('menu-principal');
        if (!botao || !menu) return;

        function definirAberto(aberto) {
            botao.setAttribute('aria-expanded', String(aberto));
            menu.classList.toggle('site-header__menu--aberto', aberto);
        }

        botao.addEventListener('click', function () {
            definirAberto(botao.getAttribute('aria-expanded') !== 'true');
        });

        // Esc fecha o menu e devolve o foco ao botao, como espera quem navega por teclado.
        document.addEventListener('keydown', function (evento) {
            if (evento.key === 'Escape' && botao.getAttribute('aria-expanded') === 'true') {
                definirAberto(false);
                botao.focus();
            }
        });
    });
})();
