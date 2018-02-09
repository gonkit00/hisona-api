'use strict';

const fs = require('fs');
const ConversationLogic = require('../services/conversation-logic');

/**
 * Respond to the incoming message with a reply
 *
 * @param {object} ctx The context object
 */
async function replyWithMessage (ctx) {

  const { body } = ctx.request;

  const artefactId = body.artefact_id;
  const collectionRef = body.collection_ref;

  try {

    const intent = await ConversationLogic.getIntent(body);
    const replyMsg = await ConversationLogic.getReply(collectionRef, artefactId, intent);

    if (!intent) {
      throw new Error(`No intent match returning default`);
    }

    const reply = {
      collection_ref: collectionRef,
      artefact_id: artefactId,
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
