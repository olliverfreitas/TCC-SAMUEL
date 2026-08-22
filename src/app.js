require('dotenv').config();

const path = require('path');
const express = require('express');
const helmet = require('helmet');

const siteRoutes = require('./routes/site.routes');
const adminRoutes = require('./routes/admin.routes');
const apiRoutes = require('./routes/api.routes');
const { paginaNaoEncontrada, tratarErro } = require('./middlewares/error-handler');

const app = express();

if (process.env.NODE_ENV === 'production') {
    app.set('trust proxy', 1);
}

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

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
