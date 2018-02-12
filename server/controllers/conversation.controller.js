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

	const messageData = {
		messageToUnderstand: body.msgStr,
		artefactId: body.artefact_id,
		collectionRef: body.collection_ref
	};

	try {
		const replyData = await ConversationLogic.respondToMessage(messageData);

		if (!replyData.replyMsg) {
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
