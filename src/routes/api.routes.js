const express = require('express');
const quizController = require('../controllers/quiz.controller');

const router = express.Router();

router.get('/status', (req, res) => {
    res.json({ status: 'ok' });
});

router.post('/quiz/:id/responder', quizController.responder);

module.exports = router;
