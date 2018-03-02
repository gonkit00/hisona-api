'use strict';

const cleanBody = body => {
	return typeof body !== 'object' ? JSON.parse(body) : body;
};

module.exports = {
  cleanBody
}