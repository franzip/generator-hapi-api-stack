'use strict';

const Validations = require('../validations/example');
const Handlers = require('../handlers/example');

module.exports = {
  job: {
    validate: Validations.job,
    handler: Handlers.job
  },

  service: {
    validate: Validations.service,
    handler: Handlers.service
  },

  queryAuthentication: {
    validate: Validations.queryAuthentication,
    auth: 'queryExample',
    handler: Handlers.queryAuthentication
  },

  headerAuthentication: {
    validate: Validations.headerAuthentication,
    auth: 'headerExample',
    handler: Handlers.headerAuthentication
  }
};
