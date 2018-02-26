'use strict';

const Router = require('koa-router');
const router = new Router();

const userController = require('../controllers/user.controller');

/**
 * User Routes
 */

// TODO: pass in artefact ID
router.get('/conversations', userController.getConversations);
router.get('/conversations/thread', userController.getConversationThread);

module.exports = router;
