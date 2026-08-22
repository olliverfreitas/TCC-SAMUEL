# Roteiro de demonstração para a banca (8 minutos)

Preparação antes de começar: servidor rodando (`npm start`), banco populado (`npm run seed`),
duas abas abertas — uma anônima (visitante) e uma logada como admin.

## 0:00 – 0:30 · Abertura
Contexto do TCC: plataforma educativa de saúde sexual e reprodutiva e planejamento familiar,
conteúdo curado de fontes oficiais, pensada para adolescentes e adultos.

## 0:30 – 1:30 · Home e navegação
Abrir `/`. Mostrar categorias, conteúdos recentes e o rodapé com o aviso legal presente em
todas as páginas. Apontar o menu principal (Conteúdos, Dúvidas, Glossário, Sobre).

## 1:30 – 2:30 · Catálogo de conteúdo
Ir em `/conteudos`. Filtrar por categoria e por faixa etária, fazer uma busca textual, mostrar
a paginação. Abrir um conteúdo e apontar fontes, tempo de leitura estimado e conteúdos
relacionados.

## 2:30 – 3:15 · Acessibilidade
Usar a barra de acessibilidade (aumentar fonte, ativar alto contraste) e mostrar que a
preferência sobrevive a um reload. Navegar uma tela inteira só com Tab/Enter, começando pelo
skip link.

## 3:15 – 4:15 · Quiz
Abrir `/quiz/1`. Responder as perguntas uma por vez e mostrar o resultado com acertos e
explicação. Destacar que a correção acontece inteiramente no servidor — a resposta certa
nunca é enviada ao navegador antes do envio.

## 4:15 – 5:15 · Canal de dúvidas
Na aba anônima, enviar uma pergunta em `/duvidas` e mostrar que ela não pede nome nem e-mail.
Mostrar a FAQ pública abaixo do formulário.

## 5:15 – 7:00 · Painel administrativo
Trocar para a aba logada (`/admin`). Mostrar o dashboard com os contadores. Ir em Conteúdos,
criar um novo conteúdo como rascunho e depois publicá-lo. Ir em Dúvidas, responder a pergunta
enviada na etapa anterior, e então publicá-la no FAQ — voltar pra aba anônima e mostrar que ela
já aparece em `/duvidas`.

## 7:00 – 8:00 · Fechamento técnico
Resumir a stack (Node + Express + EJS + SQLite, sem frontend framework), a arquitetura em
camadas (routes → controllers → services → repositories) e o resultado da auditoria de
acessibilidade (Lighthouse e axe-core, 100/100 e zero violações em todas as páginas). Abrir
espaço para perguntas.
