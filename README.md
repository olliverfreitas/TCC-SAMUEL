# Plataforma Web Educativa — Saúde Sexual e Reprodutiva e Planejamento Familiar

TCC de Sistemas de Informação (CEUNI FAMETRO). Plataforma web educativa com conteúdo
curado de fontes oficiais, quiz interativo, canal de dúvidas anônimas e painel admin.

## Instalação

1. `npm install`
2. Copie `.env.example` para `.env` e ajuste os valores (principalmente `ADMIN_EMAIL` e `ADMIN_PASSWORD`)
3. `npm run seed` (cria o schema e popula categorias, conteúdos, glossário e o usuário admin)
4. `npm start` (ou `npm run dev` para reiniciar automaticamente a cada alteração)

O servidor sobe em `http://localhost:3000` por padrão (porta configurável em `PORT`).

## Estrutura

```
src/
  app.js
  config/database.js
  routes/{site,admin,api}.routes.js
  controllers/
  services/
  repositories/
  middlewares/{error-handler}.js
  views/{partials,site,admin}/
  public/{css,js,img}/
database/{schema.sql,seed.js,database.sqlite}
```

Ver `CLAUDE.md` para stack, convenções e regras do projeto.
