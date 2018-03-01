'use strict';

const Router = require('koa-router');
const router = new Router();

const classifyController = require('../controllers/classify.controller');
const conversationController = require('../controllers/conversation.controller');

/**
 * Image Classification Routes
 */
router.post('/watson/classify', classifyController.classifyImage);
router.get('/watson/classifiers', classifyController.getClassifiers);
router.post('/image/map', classifyController.mapClassToArtefact);

/**
 * Intent Classification Routes
 */
router.post('/intent/classify', conversationController.onIncomingMessage);

module.exports = router;
