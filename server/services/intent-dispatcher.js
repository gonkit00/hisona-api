'use strict';

const IntentDispatcher = {

	async mapIntentToReply(intentAction) {

		try {
      const reply = await mapResponse(intentAction);
      return reply;
		} catch (err) {
			console.error(err);
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
		case 'education':
			return [
				{
					type: 'typing_indicator',
					duration: 2
				},
				{
					type: 'text',
					body: 'education intent reply body message'
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
