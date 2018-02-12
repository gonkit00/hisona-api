'use strict';

const fs = require('fs');

const WitClient = require('../services/wit');
const IntentDispatcher = require('../services/intent-dispatcher');

const ConversationLogic = {
  
	async respondToMessage(messageData) {

    // get the intent from the message 
    const intent = await ConversationLogic.getIntent(messageData);

    // map the intent to a reply
		const replyFromIntent = await ConversationLogic.getReply(
			messageData,
			intent
		);

		const replyData = {
			collection_ref: messageData.collectionRef,
			artefact_id: messageData.artefactId,
			intent: intent,
			replyMsg: replyFromIntent
		};

		return replyData;
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
			const reply = IntentDispatcher.mapIntentToReply(
				collectionRef,
				artefactId,
				intent
			);
			return reply;
		} catch (e) {
			console.log(e);
			return [];
		}
	},

	/**
	 * Returns a list of intents based on the message received
	 *
	 * @param {object} data The message recieved from the client
	 */
	async getIntent({ artefactId, messageToUnderstand }) {
		try {
			const intentData = await WitClient.processMessage(artefactId, messageToUnderstand);
    
			if (!intentData) {
				throw new Error(`No matching intent from the client`);
			}

			const intent = intentData.entities.intent[0].value;
      return intent;
      
		} catch (err) {
			console.log(err);
		}
  }
  
};

module.exports = ConversationLogic;
