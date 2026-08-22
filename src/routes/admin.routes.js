const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/auth.controller');
const adminController = require('../controllers/admin.controller');
const quizAdminController = require('../controllers/quiz-admin.controller');
const duvidaAdminController = require('../controllers/duvida-admin.controller');
const { requireAuth, requireRole } = require('../middlewares/auth.middleware');

const router = express.Router();

router.get('/login', authController.exibirLogin);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

router.use(requireAuth, requireRole('admin', 'editor'));

router.get('/', adminController.dashboard);

const validarConteudo = [
    body('categoriaId').notEmpty().withMessage('Selecione uma categoria.'),
    body('titulo').trim().notEmpty().withMessage('Informe o título.').isLength({ max: 200 }),
    body('resumo').trim().notEmpty().withMessage('Informe o resumo.').isLength({ max: 300 }),
    body('corpoHtml').trim().notEmpty().withMessage('Informe o conteúdo.'),
    body('fontes').trim().notEmpty().withMessage('Informe as fontes.'),
    body('faixaEtaria').isIn(['adolescente', 'adulto', 'todas']).withMessage('Selecione uma faixa etária válida.'),
];

router.get('/conteudos', adminController.listarConteudos);
router.get('/conteudos/novo', adminController.exibirFormularioConteudo);
router.post('/conteudos/novo', validarConteudo, adminController.salvarConteudo);
router.get('/conteudos/:id/editar', adminController.exibirFormularioConteudo);
router.post('/conteudos/:id/editar', validarConteudo, adminController.salvarConteudo);
router.post('/conteudos/:id/remover', adminController.removerConteudo);

router.get('/quizzes', quizAdminController.listar);
router.get('/quizzes/novo', quizAdminController.exibirFormulario);
router.post('/quizzes/novo', quizAdminController.salvar);
router.get('/quizzes/:id/editar', quizAdminController.exibirFormulario);
router.post('/quizzes/:id/editar', quizAdminController.salvar);
router.post('/quizzes/:id/remover', quizAdminController.remover);

router.get('/quizzes/:id/questoes', quizAdminController.exibirQuestoes);
router.post('/quizzes/:id/questoes', quizAdminController.salvarQuestao);
router.get('/quizzes/:id/questoes/:questaoId/editar', quizAdminController.exibirEdicaoQuestao);
router.post('/quizzes/:id/questoes/:questaoId/editar', quizAdminController.salvarQuestao);
router.post('/quizzes/:id/questoes/:questaoId/remover', quizAdminController.removerQuestao);

router.get('/duvidas', duvidaAdminController.listar);
router.post('/duvidas/:id/responder', duvidaAdminController.responder);
router.post('/duvidas/:id/rejeitar', duvidaAdminController.rejeitar);
router.post('/duvidas/:id/publicar', duvidaAdminController.publicar);
router.post('/duvidas/:id/despublicar', duvidaAdminController.despublicar);

module.exports = router;
