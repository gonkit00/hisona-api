'use strict';

const fs = require('fs');

const IntentDispatcher = {

	async mapIntentToReply(intentAction) {
		try {
			console.log(intentAction);

			const data = fs.readFileSync(
				`./mock-data/responses/${intentAction.artefactId}.json`
			);

			const responses = JSON.parse(data);

			const reply = responses.filter(response => {
				return response.intent === intentAction.intent;
      });

      if (!reply.length) {
        return { default: 'default reply' }
      }

      return reply[0].reply;
		} catch (err) {
			console.log(err);
		}
  }

};

module.exports = IntentDispatcher;
