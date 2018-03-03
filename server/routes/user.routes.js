'use strict';

const Router = require('koa-router');
const router = new Router();

const userController = require('../controllers/user.controller');
const utils = require('../utils');

/**
 * User Routes
 */
router.get('/artefacts', userController.getArtefacts);
router.get('/conversations', userController.getConversations);
router.post('/push-token', userController.savePushNotificationToken);

router.get('/reset', utils.resetToInit);

module.exports = router;
