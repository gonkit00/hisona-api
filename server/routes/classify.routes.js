'use strict';

const Router = require('koa-router');
const router = new Router();

const classifyController = require('../controllers/classify.controller');

/**
 * Watson Classification Routes
 */
router.post('/watson/classify', classifyController.classifyImage);
router.get('/watson/classifiers', classifyController.getClassifiers);

module.exports = router;
