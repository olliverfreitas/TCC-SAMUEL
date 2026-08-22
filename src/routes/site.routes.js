const express = require('express');
const siteController = require('../controllers/site.controller');
const conteudoController = require('../controllers/conteudo.controller');
const quizController = require('../controllers/quiz.controller');
const duvidaController = require('../controllers/duvida.controller');
const glossarioController = require('../controllers/glossario.controller');
const { limitarPorSessao } = require('../middlewares/rate-limit.middleware');

const router = express.Router();

router.get('/', siteController.home);
router.get('/conteudos', conteudoController.listar);
router.get('/conteudos/:slug', conteudoController.detalhe);
router.get('/quiz/:id', quizController.player);

router.get('/duvidas', duvidaController.exibir);
router.post(
    '/duvidas',
    limitarPorSessao({ chave: 'enviosDuvida', maxTentativas: 3, janelaMs: 10 * 60 * 1000 }),
    duvidaController.enviar
);

router.get('/glossario', glossarioController.exibir);

module.exports = router;
