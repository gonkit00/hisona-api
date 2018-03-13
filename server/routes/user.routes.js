'use strict';

const Router = require('koa-router');
const router = new Router();

const userController = require('../controllers/user.controller');
const utils = require('../utils');


/**
 * User Routes
 */
router
  .get('/artefacts', userController.getArtefacts)
  .get('/conversations', userController.getConversations)
  .post('/push-token', userController.savePushNotificationToken)
  .get('/reset', utils.resetToInit)
  .get('/all-artefacts', userController.getArtefactCollection);

module.exports = router;
