'use strict';

const fs = require('fs');
const db = require('../db');

/**
 * Get the artefacts
 *
 * @param {object} ctx The context object
 */
async function getArtefacts(ctx) {
	try {
		const artefacts = await db.getAllArtefacts();

		if (!artefacts) {
			throw new Error(`No artefacts recognised yet`);
		}

		ctx.ok(artefacts);
	} catch (err) {
		ctx.send(404, { error: err.message });
	}
}

/**
 * Get the conversation threads
 *
 * @param {object} ctx The context object
 */
async function getConversations(ctx) {
	try {
		const conversations = await db.getAllConversations();

		if (!conversations) {
			throw new Error(`No conversations started`);
		}

		const conversationsByOrder = conversations.reverse();

		ctx.ok(conversationsByOrder);
	} catch (err) {
		ctx.send(404, { error: err.message });
	}
}

module.exports = {
	getArtefacts,
	getConversations
};
