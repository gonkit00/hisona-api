'use strict';

const fs = require('fs');
const ConversationLogic = require('../services/conversation-logic');

/**
 * Respond to the incoming message with a reply
 *
 * @param {object} ctx The context object
 */
async function onIncomingMessage(ctx) {
	const { body } = ctx.request;

  const data = JSON.parse(body);

  console.log(data);

	const messageData = {
		messageToUnderstand: data.msgStr,
		artefactId: data.artefact_id,
		collectionRef: data.collection_ref || ''
	};

	try {
		const replyData = await ConversationLogic.respondToMessage(messageData);

		if (!replyData) {
			throw new Error(`No intent match returning default`);
		}

		ctx.ok(replyData);
	} catch (err) {
		console.log(err);
		ctx.ok({
			intent: 'default'
		});
	}
}

module.exports = { onIncomingMessage };
