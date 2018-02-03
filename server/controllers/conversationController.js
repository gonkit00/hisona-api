'use strict';

const fs = require('fs');
const WitClient = require('../services/wit');

const context = {};

const getResponse = (intent) => {
  const responses = [];

  if (intent === 'hisona') {
    responses.push('Hisona brings history to live, talk, learn and explore using the Hisona app.');
  } 

  if (intent === 'about me') {
    responses.push('I am the Hisona AI, able to direct you to Hisonified landmarks and artefacts around the world.');
  }
  
  if (context.defaultIntent) {
    responses.push('Default: there is no response for this intent');
  }

  return responses;
}

async function replyWithMessage (ctx) {

  try {
    const { body } = ctx.request;
    const intentData = await WitClient.message(body.msgStr);

    if (!intentData.entities.intent) {
      throw new Error(`No intents match "${body.msgStr}"`);
    }

    const intent = intentData.entities.intent[0].value;
    const response = await getResponse(intent);

    const reply = {
      intent,
      replyStr: response
    }

    ctx.ok(reply);

  } catch (err) {
    console.log(err);
    ctx.ok({
      intent: 'default'
    });
  }

}

module.exports = { replyWithMessage }