'use strict';

const fs = require('fs');
const WatsonClient = require('../services/watson');
const db = require('../db');
const utils = require('../utils');

/**
 * List all classifications created
 *
 * @param {object} ctx The context object
 */
async function getClassifiers(ctx) {
	try {
		const classifiers = await WatsonClient.listClassifiers();
		ctx.ok(classifiers);
	} catch (err) {
		console.log(err);
	}
}

/**
 * Classifies an image through the collection classifier e.g hisona_global
 *
 * @param {object} ctx The context object
 */
async function classifyImage(ctx) {
	try {
		const imagePath = ctx.request.body.files.photo.path;

		const data = await WatsonClient.classify(imagePath);

		if (!data) {
			throw new Error(
				'The classification request failed to recieve a response'
			);
		}

		ctx.ok(data);
	} catch (err) {
		console.log(err);
		ctx.send(404, { error: err.message });
	}
}

/**
 * Maps the returned class label from the image to the artefact
 *
 * @param {object} ctx The context object
 */
async function mapClassToArtefact(ctx) {
	try {
		const { body } = ctx.request;

		const data = utils.cleanBody(body);

		if (!data.images[0].classifiers.length) {
			throw new Error('The artefact could not be recognised from the image');
		}

		const classLabel = data.images[0].classifiers[0].classes[0].class;

		const artefactCollection = await fs.readFileSync(
			`./mock-data/artefact_collection.json`
		);

		const artefacts = JSON.parse(artefactCollection);

		const artefactFromClassLabel = artefacts.filter(a => {
			return a.artefact_id === classLabel;
		});

		if (!artefactFromClassLabel.length) {
			throw new Error('There is no artefact that matches the class label');
		}

		ctx.ok(artefactFromClassLabel);

		const status = await db.addArtefact(artefactFromClassLabel[0]);
		console.log(status);
	} catch (err) {
		console.log(err);
		ctx.send(404, { error: err.message });
	}
}

module.exports = {
	getClassifiers,
	classifyImage,
	mapClassToArtefact
};
