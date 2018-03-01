'use strict';

const fs = require('fs');

/**
 * Get the conversation thread from the artefact ID
 *
 * @param {object} ctx The context object
 */
async function getArtefacts(ctx) {
	try {
		const artefacts = await fs.readFileSync(`./mock-data/user/artefacts.json`);

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
		const conversationsData = await fs.readFileSync(
			`./mock-data/user/conversations.json`
		);

		if (!conversationsData) {
			throw new Error(`No conversations started`);
		}

		ctx.ok(conversationsData);
	} catch (err) {
		ctx.send(404, { error: err.message });
	}
}

module.exports = {
	getArtefacts,
	getConversations
};
