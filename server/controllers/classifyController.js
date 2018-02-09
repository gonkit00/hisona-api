'use strict';

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
    const data = await WatsonClient.classify();
    // if threshold is below 2 then throw back unreliable match response

    // TODO: Manage endpoints for no class returned, prompts user to search or show related
    // if (!data.images[0].classifiers[0].classes) {
    //   throw new Error('No class returned');
    // }

    ctx.ok(data);

    // const filterByThreshold = (label) => label.score > 0.2;
    // const landmarkID = data.images[0].classifiers[0].classes.filter(filterByThreshold)[0].class
    // TODO: Pass landmarkID to match with NLP service

  } catch (err) {
    console.log(err);
    ctx.send({ 'error': 'No class returned' });
  }
}

module.exports = {
  getClassifiers,
  classifyImage
};
