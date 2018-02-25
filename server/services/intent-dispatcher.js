'use strict';

const esResponseMapper = require('../../mock-data/es_spain');

const IntentDispatcher = {
	async mapIntentToReply(intentAction) {
		if (collectionRef === 'es_public') {
			try {
				console.log('INTENT TO MAP TO RESPONSE: ' + intentAction.intent);
				const reply = await mapResponse(intentAction);
				return reply;
			} catch (err) {
				console.error(err);
			}
		}
	}
};

const mapResponse = intentAction => {
	switch (intentAction.intent) {
		case 'hisona':
			return [
				{
					type: 'typing_indicator',
					duration: 2
				},
				{
					type: 'text',
					body: 'hisona intent reply body message'
				}
			];
			break;
		case 'about_bio':
			return [
				{
					type: 'typing_indicator',
					duration: 2
				},
				{
					type: 'text',
					body: 'about_bio intent reply body message'
				}
			];
			break;
		default:
			return [
				{
					type: 'typing_indicator',
					duration: 2
				},
				{
					type: 'text',
					body: 'default no intent match reply'
				}
			];
	}
};

module.exports = IntentDispatcher;
