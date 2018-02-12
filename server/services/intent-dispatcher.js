'use strict';

const esResponseMapper = require('../../mock-data/es_spain');

const IntentDispatcher = {

  async mapIntentToReply (collectionRef, artefactId, intent) {

      if (collectionRef === 'es_public') {
        try { 
          console.log('INTENT TO MAP TO RESPONSE: ' + intent);
          const reply = await mapResponse(intent);
          return reply;
        } catch (err) {
          console.error(err);
        }
      }

  },

}

const mapResponse = (intent) => {
  const reply = [];

  switch (intent) {
    case 'hisona':
      reply.push('hisona reply message');
      break;
    case 'about_bio':
      reply.push('about bio reply message');
      break;
    default:
      return 'no intent match';
  } 
   
  return reply;
}

module.exports = IntentDispatcher;
