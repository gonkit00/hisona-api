'use strict';

const Router = require('koa-router');
const router = new Router({
  prefix: '/api/v1'
});

const conversation = require('../routes/conversation.routes');
const classify= require('../routes/classify.routes');

router.get('/', async ctx => ctx.ok('Hisona API V1.0.0 online'));

router.use('/conversation', conversation.routes());  
router.use('/classify', classify.routes()); 

module.exports = router;
