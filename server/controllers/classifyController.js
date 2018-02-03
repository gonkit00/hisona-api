'use strict';

const WatsonClient = require('../services/watson');

async function getClassifiers (ctx)  {

  try {
    
    const classifiers = await WatsonClient.listClassifiers();
    ctx.ok(classifiers);

  } catch (err) {
    console.log(err);
  }

}

module.exports = { getClassifiers };
