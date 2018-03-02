'use strict';

const fs = require('fs');

const cleanBody = body => {
  return typeof body !== 'object' ? JSON.parse(body) : body;
};

const resetToInit = (ctx) => {
  const artefactsInit = fs.readFileSync('./mock-data/user/initStore.json');
  const conversationsInit = fs.readFileSync(
		'./mock-data/user/initConversations.json'
	);
  fs.writeFileSync('./mock-data/user/artefacts.json', artefactsInit);
  fs.writeFileSync('./mock-data/user/conversations.json', conversationsInit);

  ctx.ok()
};

module.exports = {
  cleanBody,
  resetToInit
};
