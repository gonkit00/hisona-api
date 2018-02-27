'use strict';

const limdu = require('limdu');
const fs = require('fs');

// First, define our base classifier type (a multi-label classifier based on winnow):
const TextClassifier = limdu.classifiers.multilabel.BinaryRelevance.bind(0, {
	binaryClassifierType: limdu.classifiers.Winnow.bind(0, { retrain_count: 10 })
});

// Now define our feature extractor - a function that takes a sample and adds features to a given features set:
const WordExtractor = function(input, features) {
	input.split(' ').forEach(function(word) {
		features[word] = 1;
	});
};

// Initialize a classifier with the base classifier type and the feature extractor:
const intentClassifier = new limdu.classifiers.EnhancedClassifier({
	classifierType: TextClassifier,
	normalizer: limdu.features.LowerCaseNormalizer,
	featureExtractor: WordExtractor
});

const LimduClassifier = {
	async loadModel(artefactId) {

		const modelData = fs.readFileSync(
			`./mock-data/intent-models/${artefactId}.json`
		);

		// Load the model based on the artefact_id, train then classify
		await intentClassifier.trainBatch(JSON.parse(modelData));
	},

	async classifyQuery({ artefactId, messageToUnderstand }) {

		await this.loadModel(artefactId);

		const intent = await intentClassifier.classify(messageToUnderstand);

		return intent;
	}
};

module.exports = LimduClassifier;

// const modelOne = loadModel([
// 	{ input: 'what school did you go to', output: 'education_one' }
// ]);
// console.log(intentClassifier.classify('what school did you go to'));

// const modelTwo = loadModel([
// 	{ input: 'what school did you go to', output: 'education_two' }
// ]);
// console.log(intentClassifier.classify('what school did you go to'));

// intentClassifier.trainBatch([
// 	{ input: "Help i'm lost", output: 'need_directions' },
// 	{ input: "I'm lost", output: 'need_directions' },
// 	{ input: "Help me, i'm lost", output: 'need_directions' },
// 	{ input: "I don't know where to go", output: 'need_directions' },
// 	{ input: "Hey i'm lost", output: 'need_directions' },
// 	{ input: 'Can i have directions', output: 'need_directions' },
// 	{ input: "I'm not sure where to go", output: 'need_directions' },
// 	{ input: "I'm unsure where to go", output: 'need_directions' },

// 	{ input: "I'm checking my flight", output: 'check_flight' },
// 	{ input: 'I need to check about my flight', output: 'check_flight' },
// 	{
// 		input: 'Do you think you can help me check my flight?',
// 		output: 'check_flight'
// 	},
// 	{ input: "What's my flight", output: 'check_flight' },
// 	{ input: 'Can you help me check flight details?', output: 'check_flight' },
// 	{ input: 'Can i check my flight details?', output: 'check_flight' },
// 	{ input: 'Can i check my flight details', output: 'check_flight' },
// 	{ input: 'Can i check my flight timing?', output: 'check_flight' },
// 	{ input: 'Can i check my flight timing', output: 'check_flight' },
// 	{ input: 'Can i check my boarding gate?', output: 'check_flight' },
// 	{ input: 'Can i check my boarding gate', output: 'check_flight' },
// 	{ input: 'Can i check my boarding time?', output: 'check_flight' },
// 	{ input: 'Can i check my boarding time', output: 'check_flight' },

// 	{
// 		input: 'Do you think you can remind me of my flight?',
// 		output: 'remind_me'
// 	},
// 	{ input: 'Could you remind me of my flight?', output: 'remind_me' },
// 	{ input: 'Could you remind me later?', output: 'remind_me' },
// 	{ input: 'Can you remind me later?', output: 'remind_me' },
// 	{ input: 'Could you notify me later?', output: 'remind_me' },
// 	{ input: 'Could you notify me of my flight later?', output: 'remind_me' },
// 	{ input: 'Can you notify me of my flight later?', output: 'remind_me' },
// 	{ input: 'Please remind me', output: 'remind_me' },
// 	{ input: 'Do remind me later!', output: 'remind_me' },
// 	{ input: 'Do notify me later!', output: 'remind_me' },

// 	{ input: 'Can i check the weather for my flight?', output: 'check_weather' },
// 	{ input: "What's the weather like?", output: 'check_weather' },
// 	{
// 		input: 'Do you think i could check the weather for my flight?',
// 		output: 'check_weather'
// 	},
// 	{ input: 'Can i check the weather?', output: 'check_weather' },
// 	{ input: "Hey what's the weather like?", output: 'check_weather' },
// 	{ input: "What's the weather at", output: 'check_weather' },
// 	{ input: "What's the weather like later?", output: 'check_weather' },

// 	{ input: 'No', output: 'negative_response' },
// 	{ input: 'Dude', output: 'negative_response' },
// 	{ input: 'Go to hell', output: 'negative_response' },
// 	{ input: 'Screw off', output: 'negative_response' },
// 	{ input: 'How about no', output: 'negative_response' },

// 	{ input: 'Thanks so much!', output: 'positive_response' },
// 	{ input: 'Thanks for the help!', output: 'positive_response' },
// 	{ input: 'Appreciate it!', output: 'positive_response' },
// 	{ input: 'Thank you', output: 'positive_response' },

// 	{ input: 'Hey there', output: 'greetings' },
// 	{ input: 'Hi', output: 'greetings' },
// 	{ input: 'Nice to meet you', output: 'greetings' },
// 	{ input: 'I need help', output: 'greetings' },
// 	{ input: 'Hello', output: 'greetings' }
// ]);
