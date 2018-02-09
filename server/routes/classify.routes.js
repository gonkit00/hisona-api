'use strict';

const Router = require('koa-router');
const router = new Router();

const classifyController = require('../controllers/classifyController');

/**
 * Watson Classification Routes
 */
router.post('/watson/image', classifyController.classifyImage);
router.get('/watson/classifiers', classifyController.getClassifiers);

module.exports = router;