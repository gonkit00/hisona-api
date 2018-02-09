'use strict';

// require the Koa server
const server = require('../server/index');
// require supertest
const request = require('supertest');

// close the server after each test
afterEach(() => {
  server.close();
});

describe('routes: 404', () => {

  it('should respond as expected', async () => {
    const response = await request(server).get('/');
    expect(response.status).toEqual(404);
    expect(response.type).toEqual('application/json');
    expect(response.body.message).toEqual('Sorry, this URL does not exist.');
  });

});


describe('routes: index', () => {

  it('should respond as expected', async () => {
    const response = await request(server).get('/api/v1');
    expect(response.status).toEqual(200);
    expect(response.type).toEqual('application/json');
    expect(response.body.message).toEqual('Hisona API V1.0.0 online');
  });

});

describe('routes: conversation logic', () => {

  const mockMessage = {
    user_id: 12,
    collection_ref: 'es_public', 
    artefact_id: '1_es_public_ramonberengueriii', 
    msgStr: 'what is hisona', 
  }

  it('should respond with a reply', async () => {
    const response = await request(server).post('/api/v1/conversation/incoming').send(mockMessage)
    expect(response.status).toEqual(200);
    expect(response.type).toEqual('application/json');
    expect(response.body).toHaveProperty('intent');
    expect(response.body).toHaveProperty('reply');
  });

});


describe('routes: image classification', () => {

  it('List Classifers: should respond as expected', async () => {
    const response = await request(server).get('/api/v1/classify/watson/classifiers');
    expect(response.status).toEqual(200);
    expect(response.type).toEqual('application/octet-stream');
  });

  it('Classify image: should respond as expected', async () => {
    const response = await request(server).post('/api/v1/classify/watson/image');
    expect(response.status).toEqual(200);
    expect(response.type).toEqual('application/octet-stream');
  });

});

