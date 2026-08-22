const express = require('express');
const siteController = require('../controllers/site.controller');
const conteudoController = require('../controllers/conteudo.controller');

const router = express.Router();

router.get('/', siteController.home);
router.get('/conteudos', conteudoController.listar);
router.get('/conteudos/:slug', conteudoController.detalhe);

module.exports = router;
