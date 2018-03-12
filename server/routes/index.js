'use strict';

const Router = require('koa-router');
const router = new Router({
	prefix: '/api/v1'
});
const artefactController = require('../controllers/artefact.controller');


const classify = require('../routes/classify.routes');
const user = require('../routes/user.routes');

router.get('/', async ctx => ctx.ok('Hisona API Status: v1.0.0 available'));

router.use('/classification', classify.routes());
router.use('/user', user.routes());
router.get('/artefacts', artefactController.getArtefactCollection);

module.exports = router;
