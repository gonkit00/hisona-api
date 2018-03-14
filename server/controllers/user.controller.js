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

/**
 * Stores the users push notification token from Expo
 *
 * @param {object} ctx The context object
 */
async function savePushNotificationToken(ctx) {
	try {
		// ExponentPushToken[ieFwwFBuqM2g6SVI8xwj44]
		console.log(ctx.request.body);
		ctx.ok(ctx.request.body);
	} catch (err) {
		console.log(err);
		ctx.send(404, { error: err.message });
	}
}

async function getArtefactCollection(ctx) {
	try {
    const artefactCollection = await db.getArtefactCollection();
    if (!Object.keys(artefactCollection).length) throw new Error('Empty collection');
		ctx.ok(artefactCollection);
	} catch (err) {
		ctx.send(404, { error: err.message });
	}
}

async function getThread(ctx) {
	try {
    const artefactId = ctx.params.artefactId;
		const artefactCollection = await db.getArtefactCollection();
		const artefacts = artefactCollection.filter(artefact =>
	    (artefact.artefact_id === artefactId)
		)
		const status = await db.addArtefact(artefacts[0]);
    let conversations = await db.getAllConversations();
		conversations = conversations.filter(conversation =>
      (conversation.artefact_id === artefactId)
		);
		ctx.ok(conversations[0].conversation_id);
	} catch (e) {
		console.log(e);
		ctx.send(404, { error: e.message });
	}
}

module.exports = {
	getArtefacts,
	getConversations,
	savePushNotificationToken,
	getArtefactCollection,
	getThread
};
