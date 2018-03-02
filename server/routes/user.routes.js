'use strict';

const Router = require('koa-router');
const router = new Router();

const userController = require('../controllers/user.controller');

/**
 * User Routes
 */
router.get('/artefacts', userController.getArtefacts);
router.get('/conversations', userController.getConversations);

module.exports = router;
