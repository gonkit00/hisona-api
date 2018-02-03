'use strict';

const Koa = require('koa');
const Router = require('koa-router');
const router = new Router();

const app = new Koa();
const config = require('../config');

router.get('/', async ctx => {
  ctx.body = {
    data: "JSON response"
  };
});

app.use(router.routes());

const server = app.listen(config.port).on('error', err => {
  console.error(err);
});

module.exports = server;

