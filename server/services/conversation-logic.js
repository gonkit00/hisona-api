'use strict';

const fs = require('fs');
const WitClient = require('../services/wit');

const responseFile = './mock-data/artefact_responses.json';

/**
 * Retrieve the associated reply from the DB based on the intent
 *
 * @param {string} collectionRef The collection ID reference
 * @param {string} artefactId The artefact ID
 * @param {string} intent The intent used to match a reply
 */
async function getReply (collectionRef, artefactId, intent) {

  try {
    const responsesString = fs.readFileSync(responseFile);
    const responsesObj = JSON.parse(responsesString);

    // const responses = responsesObj
    //   .map(c =>  {
    //     if (c.collection_ref === collectionRef) {
    //       let artefacts = c.artefacts.find(() => artefactId)
    //       return artefacts.artefact_responses
    //     }
    //   })
    //   .reduce((res, intents) => {
    //     let match = intents.find(() => intent)
    //     res = match.intent_responses;
    //     console.log(res[0]);
    //     return res[0];
    //   }, {});

    const responsesArray = [];

    // Test responses
    if (intent === 'about_bio') {
      responsesArray.push({ type: "text", "reply" : `This is the reply string for ${intent} - ${artefactId}`});
    } 
    
    if (!intent) {
      // 'Hisona brings history to live, talk, learn and explore using the Hisona app.'
      responsesArray.push('Default: there is no response for this intent');
    }

    return responsesArray;

  } catch (e) {
    console.log(e);
    return [];
  }

}

/**
 * Returns a list of intents based on the message received
 *
 * @param {object} data The message recieved from the client
 */
async function getIntent (data) {
  const artefactId = data.artefact_id;
  const msgToUnderstand = data.msgStr;

  try {
    const witClient = await WitClient.createInstance(artefactId);
    const intentData = await witClient.message(msgToUnderstand);

    if (!intentData) {
      throw new Error(`No response from the client`);
    }

    const intent = intentData.entities.intent[0].value;

    return intent;

  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  getReply,
  getIntent
}


