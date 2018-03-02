'use strict';

const fs = require('fs');

const artefactsStore = './mock-data/user/artefacts.json';
const conversationsStore = './mock-data/user/conversations.json';

const fetchArtefacts = () => {
	try {
		const artefacts = fs.readFileSync(artefactsStore);
		return JSON.parse(artefacts);
	} catch (err) {
		return [];
	}
};

const fetchConversations = () => {
	try {
		const conversations = fs.readFileSync(conversationsStore);
		return JSON.parse(conversations);
	} catch (err) {
		return [];
	}
};

async function storeArtefacts(artefacts) {
	await fs.writeFileSync(artefactsStore, JSON.stringify(artefacts));
}

async function storeConversations(conversations) {
	await fs.writeFileSync(conversationsStore, JSON.stringify(conversations));
}

const addArtefact = artefact => {
	try {
		const artefacts = fetchArtefacts();

		// check if artefact exists
		const existingArtefact = doesExist(artefact, artefacts);

		if (existingArtefact) {
			throw new Error('Artefact already exists');
		}

		const id = getId();

		const defaultConversation = {
			conversation_id: id,
			artefact_id: artefact.artefact_id,
			last_message_subtitle: artefact.default_onboarding_message[0].text,
			last_message_date: '15:00',
			thread: [
				{
					content_type: 'text',
					direction: 'left',
					text: artefact.default_onboarding_message[0].text
				}
			]
		};

		artefacts.push(artefact);

		storeArtefacts(artefacts);
		addConversation(defaultConversation);

		return 'Succesfully stored artefact';
	} catch (err) {
		console.log(err);
		return err;
	}
};

const doesExist = (entity, collection) => {
	return collection.find(e => e._id === entity._id);
};

const getId = () => {
  const conversations = fetchConversations();
  const id = conversations.length + 1;
  return id.toString();
};

const addConversation = conversation => {
	const conversations = fetchConversations();

	conversations.push(conversation);
	const status = storeConversations(conversations);

	return status;
};

const getAllArtefacts = () => {
	const artefacts = fetchArtefacts();

	// TODO
	if (artefacts.length) {
		return artefacts;
	} else {
		return 'Error: no artefacts in store';
	}
};

const getAllConversations = () => {
	const conversations = fetchConversations();

	// TODO
	if (conversations.length) {
		return conversations;
	} else {
		return 'Error: no conversations in store';
	}
};

module.exports = {
	addArtefact,
	getAllArtefacts,
	addConversation,
	getAllConversations
};
