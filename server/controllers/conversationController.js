'use strict';

const fs = require('fs');
const WitClient = require('../services/wit');

/**
 * Returns an array of responses based on the intent to reply with
 *
 * @param {string} intent The intent used to match a reply
 */
async function getReply (intent) {

  // todo: refactor to switch statement
  
  const responses = [];

  if (intent === 'hisona') {
    responses.push('Hisona brings history to live, talk, learn and explore using the Hisona app.');
  } 

  if (intent === 'about me') {
    responses.push('I am the Hisona AI, able to direct you to Hisonified landmarks and artefacts around the world.');
  }
  
  if (!intent) {
    responses.push('Default: there is no response for this intent');
  }

  return responses;
}

/**
 * Returns a list of intents based on the message received
 *
 * @param {object} data The incoming message 
 */
async function getIntent (data) {
  try {
    const landmarkID = data.landmarkID;
    const msgToUnderstand = data.msgStr;

    const witClient = await WitClient.createInstance(landmarkID);
    const intentData = await witClient.message(msgToUnderstand);

    if (!intentData) {
      throw new Error(`No response from the client`);
    }

    const intent = intentData.entities.intent[0].value;

    return intent;

  } catch (err) {
    console.log(err);
  }
}

/**
 * Send a reply message back based on the matching intent
 *
 * @param {object} ctx The context object
 */
async function replyWithMessage (ctx) {
  const { body } = ctx.request;

  try {
    const intent = await getIntent(body);
    const replyMsg = await getReply(intent);

    if (!intent) {
      throw new Error(`No intent match returning default`);
    }

    const reply = {
      landmarkID: body.landmarkID,
      intent: intent,
      reply: replyMsg
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
