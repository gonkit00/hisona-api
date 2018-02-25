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
	 * @param {string} artefactId The ID of the artefact in context
	 */
	async createInstance(artefactId) {
		let access_token = process.env.COLUMBUS_TOKEN;

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
