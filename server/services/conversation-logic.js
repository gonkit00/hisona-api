'use strict';

const fs = require('fs');

const Construe = require('../services/construe/bayesian');
const IntentDispatcher = require('../services/intent-dispatcher');

const ConversationLogic = {
	async respondToMessage(messageData) {
		// get the intent from the message
		const intent = await ConversationLogic.getIntent(messageData);

		// map the intent to the reply
		const replyFromIntent = await ConversationLogic.getReply(
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
	 * Retrieve the associated reply from the intent
	 *
	 * @param {string} collectionRef The collection ID reference
	 * @param {string} artefactId The artefact ID
	 * @param {string} intent The intent used to match a reply
	 */
	async getReply({ collectionRef, artefactId }, intent) {
		try {
			const intentAction = {
				collectionRef,
				artefactId,
				intent
			};

			const reply = await IntentDispatcher.mapIntentToReply(intentAction);
			// error handling for reply
			return reply;
		} catch (e) {
			console.log(e);
			return [];
		}
	}
};

module.exports = ConversationLogic;
