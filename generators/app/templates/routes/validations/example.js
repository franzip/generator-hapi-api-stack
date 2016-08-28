'use strict';

const Joi = require('joi');
const Config = require('../../runtime/routes').pets;

module.exports = {
  job: {
    payload: {
      type: Joi.string().valid(Config.ALLOWED_TYPES).required()
    }
  },

  service: {

  },

  queryAuthentication: {

  },

  headerAuthentication: {

  }
};
