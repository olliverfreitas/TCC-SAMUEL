const express = require('express');
const { body } = require('express-validator');
const siteController = require('../controllers/site.controller');
const quizController = require('../controllers/quiz.controller');
const duvidaController = require('../controllers/duvida.controller');

const router = express.Router();

router.get('/', siteController.home);
router.get('/categorias/:slug', siteController.categoria);
router.get('/artigos/:slug', siteController.artigo);

router.get('/quiz', quizController.exibir);
router.post('/quiz', quizController.corrigir);

router.get('/duvidas', duvidaController.exibirFormulario);
router.post(
    '/duvidas',
    body('pergunta').trim().notEmpty().withMessage('Escreva sua duvida.').isLength({ max: 1000 }),
    duvidaController.enviar
);

module.exports = router;
