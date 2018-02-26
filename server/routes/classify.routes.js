'use strict';

const Router = require('koa-router');
const router = new Router();

const classifyController = require('../controllers/classify.controller');
const conversationController = require('../controllers/conversation.controller');

/**
 * Watson Classification Routes
 */
router.post('/watson/classify', classifyController.classifyImage);
router.get('/watson/classifiers', classifyController.getClassifiers);

/**
 * Construe Classification Routes
 */
router.post('/construe/incoming', conversationController.onIncomingMessage);

module.exports = router;
