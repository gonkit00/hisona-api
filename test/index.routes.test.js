'use strict';

// require the Koa server
const server = require('../server/index');
// require supertest
const request = require('supertest');

// close the server after each test
afterEach(() => {
  server.close();
});

describe('routes: index', () => {
  it('should respond as expected', async () => {
    const response = await request(server).get('/');
    expect(response.status).toEqual(200);
    expect(response.type).toEqual('application/json');
    expect(response.body.data).toEqual('JSON response');
  });
});


