'use strict';

const fs = require('fs');

/**
 * Get the conversation threads
 *
 * @param {object} ctx The context object
 */
async function getConversations(ctx) {
	// const { body } = ctx.request;

	// const messageData = {
	// 	messageToUnderstand: body.msgStr,
	// 	artefactId: body.artefact_id,
	// 	collectionRef: body.collection_ref
	// };

	try {
		const conversationsData = await fs.readFileSync(
			`./mock-data/user/conversations.json`
		);

		if (!conversationsData) {
			throw new Error(`No conversations`);
		}

		ctx.ok(conversationsData);
	} catch (err) {
		console.log(err);
	}
}

/**
 * Get the conversation thread from the artefact ID
 *
 * @param {object} ctx The context object
 */
async function getConversationThread(ctx) {
	// const { body } = ctx.request;

	// const messageData = {
	// 	messageToUnderstand: body.msgStr,
	// 	artefactId: body.artefact_id,
	// 	collectionRef: body.collection_ref
	// };

	try {
		const artefactId = '2_es_pub_christophercolumbus';
		const threadData = await fs.readFileSync(
			`./mock-data/user/${artefactId}_thread.json`
		);

		if (!threadData) {
			throw new Error(`No conversation thread for given ID`);
		}

		ctx.ok(threadData);
	} catch (err) {
		console.log(err);
	}
}

module.exports = {
  getConversations,
  getConversationThread
};
