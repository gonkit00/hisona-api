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
    const response = await request(server).get('/api/v1');
    expect(response.status).toEqual(200);
    expect(response.type).toEqual('application/json');
    expect(response.body.message).toEqual('Hisona online');
  });

});


describe('routes: conversation logic', () => {

  it('should respond as expected', async () => {
    const response = await request(server).get('/api/v1');
    expect(response.status).toEqual(200);
    expect(response.type).toEqual('application/json');
    expect(response.body.message).toEqual('Hisona online');
  });

});


describe('routes: image classification', () => {

  it('should respond as expected', async () => {
    const response = await request(server).get('/api/v1');
    expect(response.status).toEqual(200);
    expect(response.type).toEqual('application/json');
    expect(response.body.message).toEqual('Hisona online');
  });

});

