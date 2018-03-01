'use strict';

const fs = require('fs');
const WatsonClient = require('../services/watson');

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
 * Classify an image through a collection classifier e.g es_public
 *
 * @param {object} ctx The context object
 */
async function classifyImage(ctx) {
	try {
		const imagePath = ctx.request.body.files.photo.path;

		const data = await WatsonClient.classify('./test-images/roman.jpg');

		if (!data) {
			throw new Error('The artefact could not be recognised from the image');
		}

		// now look up the artefact and welcome message to send to the client
		ctx.ok(data);
	} catch (err) {
		console.log(err);
		ctx.send(404, { error: err.message });
	}
}
/**
 * Maps the class label from the image to the artefact
 *
 * @param {object} ctx The context object
 */
async function mapClassToArtefact(ctx) {
	try {
    const { body } = ctx.request;

    const data = JSON.parse(body);

		const classLabel = data.images[0].classifiers[0].classes[0].class;

		const artefactCollection = await fs.readFileSync(
			`./mock-data/artefact_collection.json`
		);

		const artefacts = JSON.parse(artefactCollection);

		const artefactFromClassLabel = artefacts.filter(a => {
			return a.artefact_id === classLabel;
		});

		if (!artefactFromClassLabel.length) {
			throw new Error('There is no artefact that matches the class label.');
		}

		console.log('Artefact found: ', artefactFromClassLabel);

		ctx.ok(artefactFromClassLabel);
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
