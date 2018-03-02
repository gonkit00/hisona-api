'use strict';

const limdu = require('limdu');
const fs = require('fs');

// Base multi-label classifier based on winnow
const TextClassifier = limdu.classifiers.multilabel.BinaryRelevance.bind(0, {
	binaryClassifierType: limdu.classifiers.Winnow.bind(0, { retrain_count: 10 })
});

// Feature extractors
const WordExtractor = function(input, features) {
	input.split(' ').forEach(function(word) {
		features[word] = 1;
	});
};

// Initialize a classifier
const intentClassifier = new limdu.classifiers.EnhancedClassifier({
	classifierType: TextClassifier,
	normalizer: limdu.features.LowerCaseNormalizer,
	featureExtractor: WordExtractor
});

const LimduClassifier = {
	/**
	 * Load and train the model
	 */
	async loadModel(artefactId) {
		// Load the model based on the artefact_id, then train the model
		const modelData = fs.readFileSync(
			`./mock-data/intent-models/${artefactId}.json`
		);
		await intentClassifier.trainBatch(JSON.parse(modelData));
	},

	/**
	 * Classify the message
	 */
	async classifyQuery({ artefactId, messageToUnderstand }) {
		// Load the trained model then classify the message
		await this.loadModel(artefactId);
		const intent = await intentClassifier.classify(messageToUnderstand);
		return intent;
	}
};

module.exports = LimduClassifier;
