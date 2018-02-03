'use strict';

const Koa = require('koa');

const logger = require('koa-logger');
const serve = require('koa-static');
const koaBody = require('koa-body');
const respond = require('koa-respond');

const app = new Koa();
const config = require('../config');
const router = require('./routes');

app.use(logger());
app.use(koaBody());
app.use(respond());

router.get('/', async ctx => ctx.ok('Hisona online'));

app.use(router.routes());

const server = app.listen(config.port).on('error', err => {
  console.error(err);
});

console.log(`Server now listening on: ${config.port}`)

module.exports = server;

