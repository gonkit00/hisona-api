'use strict';

const fs = require('fs');
const ConversationLogic = require('../services/conversation-logic');
const utils = require('../utils');

/**
 * Replies to the incoming message
 *
 * @param {object} ctx The context object
 */
async function onIncomingMessage(ctx) {
	const { body } = ctx.request;

	const data = utils.cleanBody(body);

	console.log(data);

	const messageData = {
		messageToUnderstand: data.text || '',
		artefactId: data.artefact_id || '',
		collectionRef: data.collection_ref || ''
	};

	try {
		const replyData = await ConversationLogic.respondToMessage(messageData);

		if (!replyData) {
			throw new Error(`Failed to respond to message`);
    }

		ctx.ok(replyData);
	} catch (err) {
		console.log(err);
		ctx.send(404, { err: err.message });
	}
}

module.exports = { onIncomingMessage };
