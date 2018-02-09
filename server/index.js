'use strict';

require('dotenv').config();

const Koa = require('koa');

const cors = require('koa-cors');
const logger = require('koa-logger');
const serve = require('koa-static');
const koaBody = require('koa-body');
const respond = require('koa-respond');

const app = new Koa();
const config = require('../config');
const router = require('./routes');

app
  .use(cors(config.corsOptions))
  .use(async (ctx, next) => {
    try {
      await next();
    } catch (e) {
      console.error (e);
      ctx.status = 500;
      if (e.message) {
        ctx.body = {
          errors: [e.message]
        };
      }
    }
  })
  .use(koaBody())
  .use(logger())
  .use(respond());

app.use(router.routes());
app.use(router.allowedMethods());

/**
 * 404
 */
app.use(async (ctx, next) => {
  if (parseInt(ctx.status) === 404) {
     ctx.send(404, { message: 'Sorry, this URL does not exist.' });
  }
});

const server = app.listen(config.port).on('error', err => {
  console.error(err);
});

console.log(`Server now listening on: ${config.port}`)

module.exports = server;

