const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/auth.controller');
const adminController = require('../controllers/admin.controller');
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

module.exports = router;
