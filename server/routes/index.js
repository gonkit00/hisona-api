'use strict';

const Router = require('koa-router');
const router = new Router({
  prefix: '/api/v1'
});

const conversationController = require('../controllers/conversationController');
const classifyController = require('../controllers/classifyController');

/**
 * Conversation Logic Routes
 */
router.post('/conversation/incoming', conversationController.replyWithMessage)

/**
 * Image Classification Routes
 */
// router.post('/classify/watson/classify')
router.get('/classify/watson/classifiers', classifyController.getClassifiers);


module.exports = router;
