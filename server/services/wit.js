'use strict';

const fs = require('fs');
const {Wit, log} = require('node-wit');

const WitClient = {

  /**
   * Function description
   *
   * @param {string} landmarkID The context object
   */
  async createInstance (landmarkID) {

    let access_token;

    // read es_public.json and find key from classID then create instance with nlpservices token
    if (landmarkID === '1_es_pub_ramonberengueriii') {
      access_token = process.env.RAMON_TOKEN;
    } else if (landmarkID === '2_es_pub_christophercolubus') {
      access_token = process.env.COLUMBUS_TOKEN;
    } else {
      // default fallback, todo
      access_token = process.env.HISONA_ACCESS_TOKEN;
    }

    try {
      const instance = await new Wit({
        accessToken: access_token,
        logger: new log.Logger(log.DEBUG) 
      });
      return instance;
    } catch (err){
      console.log(err);
    }
  }

}

module.exports = WitClient;
