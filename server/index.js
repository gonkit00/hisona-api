'use strict';

const Koa = require('koa');
const Router = require('koa-router');
const router = new Router();

const logger = require('koa-logger');
const serve = require('koa-static');
const koaBody = require('koa-body');
const respond = require('koa-respond');

const app = new Koa();
const config = require('../config');

app.use(logger());
app.use(koaBody());
app.use(respond());

router.get('/', async ctx => {
  ctx.body = {
    data: "Hisona online"
  };
});

app.use(router.routes());

const server = app.listen(config.port).on('error', err => {
  console.error(err);
});

console.log(`Server now listening on: ${config.port}`)

module.exports = server;

