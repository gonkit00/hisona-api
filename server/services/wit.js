'use strict';

const fs = require('fs');
const { Wit, log } = require('node-wit');

const WitClient = {
  
	async processMessage(artefactId, messageToUnderstand) {
		const witClientInstance = await WitClient.createInstance(artefactId);
		const intentData = await witClientInstance.message(messageToUnderstand);
		return intentData;
	},

	/**
	 * Returns the correct WIT app token for the artefact in context
	 *
	 * @param {string} artefact_id The ID of the artefact in context
	 */
	async createInstance(artefactId) {

    let access_token;
    
		// read es_public.json and find key from classID then create instance with nlpservices token
		if (artefactId === '1_es_pub_ramonberengueriii') {
			access_token = process.env.RAMON_TOKEN;
		} else if (artefactId === '2_es_pub_christophercolubus') {
			access_token = process.env.COLUMBUS_TOKEN;
		} else {
			// default fallback, todo
			access_token = process.env.HISONA_ACCESS_TOKEN;
		}

		try {
			const instance = await new Wit({
				accessToken: access_token,
				logger: new log.Logger(log.DEBUG)
			});
			return instance;
		} catch (err) {
			console.log(err);
		}
	}
};

module.exports = WitClient;


