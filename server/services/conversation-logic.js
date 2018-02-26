'use strict';

const fs = require('fs');

const Construe = require('../services/construe/bayesian');

const ConversationLogic = {
	async respondToMessage(messageData) {
		// get the intent from the message
		const intent = await ConversationLogic.getIntent(messageData);

		// map the intent to the reply
		const replyFromIntent = await ConversationLogic.mapIntentToReply(
			messageData,
			intent
		);

		const replyData = {
			collection_ref: messageData.collectionRef,
			artefact_id: messageData.artefactId,
			intent: intent,
			reply: replyFromIntent
		};

		return replyData;
	},

	/**
	 * Returns a list of intents based on the message received
	 *
	 * @param {object} data The message recieved from the client
	 */
	async getIntent({ artefactId, messageToUnderstand }) {
		try {
			const construe = new Construe.Bayesian();

			// load intent model data based on artefact ID
			const data = fs.readFileSync(`./mock-data/intents/${artefactId}.json`);

			construe.trainAll(JSON.parse(data));

			const intent = construe.classify(messageToUnderstand);

			if (!intent) {
				throw new Error(`No matching intent from the client`);
			}

			return intent;
		} catch (err) {
			console.log(err);
		}
	},

	/**
	 * Maps the decoded intent to a reply response object
	 *
	 * @param {string} collectionRef The collection ID reference
	 * @param {string} artefactId The artefact ID
	 * @param {string} intent The intent used to match a reply
	 */
	async mapIntentToReply({ collectionRef, artefactId }, intent) {
		try {
			const intentAction = {
				collectionRef,
				artefactId,
				intent
			};

			const data = fs.readFileSync(
				`./mock-data/responses/${intentAction.artefactId}.json`
			);

			const responses = JSON.parse(data);

			const reply = responses.filter(r => r.intent === intentAction.intent);

			if (!reply.length) {
				throw new Error('No response match the given intent, the default message has been sent.')
			}

			return reply[0].reply;
		} catch (e) {
			console.log(e);
			return [{ default: 'default reply' }];
		}
	}
};

module.exports = ConversationLogic;
