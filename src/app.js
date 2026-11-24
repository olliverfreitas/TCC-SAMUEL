require('dotenv').config();

const path = require('path');
const express = require('express');
const helmet = require('helmet');
const session = require('express-session');
const SQLiteStore = require('connect-sqlite3')(session);

const db = require('./config/database');
const siteRoutes = require('./routes/site.routes');
const adminRoutes = require('./routes/admin.routes');
const apiRoutes = require('./routes/api.routes');
const { paginaNaoEncontrada, tratarErro } = require('./middlewares/error-handler');

const emProducao = process.env.NODE_ENV === 'production';

// Com o secret de exemplo, qualquer um que leia o repositório consegue forjar
// cookie de sessão de admin. Melhor o serviço não subir do que subir assim.
const secretInseguro = !process.env.SESSION_SECRET
    || process.env.SESSION_SECRET === 'troque-este-valor-em-producao'
    || process.env.SESSION_SECRET.length < 32;
if (emProducao && secretInseguro) {
    console.error('SESSION_SECRET ausente, de exemplo ou curto demais. Gere um com: openssl rand -hex 32');
    process.exit(1);
}

const app = express();

if (emProducao) {
    app.set('trust proxy', 1);
}

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// O padrao do helmet e' mantido de proposito — inclusive script-src 'self', que
// e' o que impede script de terceiro na pagina. A unica abertura e' img-src para
// os ladrilhos do OpenStreetMap, que o mapa de /servicos busca no dominio deles
// (RF29). O Leaflet em si e' servido por nos, de src/public/vendor.
const diretivasCsp = {
    ...helmet.contentSecurityPolicy.getDefaultDirectives(),
    'img-src': ["'self'", 'data:', 'https://*.tile.openstreetmap.org'],
};

app.use(helmet({ contentSecurityPolicy: { directives: diretivasCsp } }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(
    session({
        // Sessões num arquivo SQLite à parte, na mesma pasta do banco principal:
        // na memória, o admin seria deslogado a cada restart do systemd.
        store: new SQLiteStore({ db: 'sessoes.sqlite', dir: path.dirname(db.name) }),
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            sameSite: 'lax',
            secure: emProducao,
            maxAge: 1000 * 60 * 60 * 2,
        },
    })
);

app.use('/', siteRoutes);
app.use('/admin', adminRoutes);
app.use('/api', apiRoutes);

app.use(paginaNaoEncontrada);
app.use(tratarErro);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

module.exports = app;
