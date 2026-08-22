const express = require('express');
const authController = require('../controllers/auth.controller');
const adminController = require('../controllers/admin.controller');
const { exigirAutenticacao } = require('../middlewares/auth.middleware');

const router = express.Router();

router.get('/login', authController.exibirLogin);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

router.use(exigirAutenticacao);

router.get('/', adminController.dashboard);

router.get('/artigos', adminController.listarArtigos);
router.get('/artigos/novo', adminController.exibirFormularioArtigo);
router.post('/artigos/novo', adminController.salvarArtigo);
router.get('/artigos/:id/editar', adminController.exibirFormularioArtigo);
router.post('/artigos/:id/editar', adminController.salvarArtigo);
router.post('/artigos/:id/remover', adminController.removerArtigo);

router.get('/duvidas', adminController.listarDuvidas);
router.post('/duvidas/:id/responder', adminController.responderDuvida);

module.exports = router;
