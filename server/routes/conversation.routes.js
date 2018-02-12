'use strict';

const Router = require('koa-router');
const router = new Router();

const conversationController = require('../controllers/conversation.controller');

/**
 * Conversation Logic Routes
 */
router.post('/incoming', conversationController.onIncomingMessage)


module.exports = router;