'use strict';

const app = require('../app');

const {Wit, log} = require('node-wit');

const ACCESS_TOKEN = "H3B2JBLANDSE4Z24VQOZGC3AZKH6SPPG";

const WitClient = new Wit({
  accessToken: ACCESS_TOKEN,
  logger: new log.Logger(log.DEBUG) 
});

module.exports = WitClient;