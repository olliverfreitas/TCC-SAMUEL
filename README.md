# Plataforma Web Educativa — Saúde Sexual e Reprodutiva e Planejamento Familiar

TCC de Sistemas de Informação (CEUNI FAMETRO). Plataforma web educativa com conteúdo
curado de fontes oficiais, quiz interativo, canal de dúvidas anônimas e painel admin.

## Stack

- Frontend: HTML5, CSS3 e JavaScript vanilla (ES6+).
- Backend: Node.js + Express + EJS (renderização no servidor).
- Banco: SQLite3 via `better-sqlite3`.

## Configuração

```bash
npm install
cp .env.example .env
npm run db:migrate
npm run db:seed
npm run db:create-admin -- "Nome do Admin" admin@exemplo.com senha123
npm start
```

O servidor sobe em `http://localhost:3000` por padrão. O painel administrativo
fica em `/admin/login`.

## Estrutura

```
src/
  app.js
  config/database.js
  routes/{site,admin,api}.routes.js
  controllers/
  services/
  repositories/
  middlewares/{auth,errorHandler}.js
  views/{partials,site,admin}/
  public/{css,js,img}/
database/{schema.sql,seed.sql,database.sqlite}
```
