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

	console.log(typeof body);

	const data = cleanBody(body);

	const messageData = {
		messageToUnderstand: data.msgStr || '',
		artefactId: data.artefact_id || '',
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
		ctx.send(404, {
			error: err.message
		});
	}
}

const cleanBody = body => {
	return typeof body !== 'object' ? JSON.parse(body) : body;
};

module.exports = { onIncomingMessage };
