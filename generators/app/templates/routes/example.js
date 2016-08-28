'use strict';

const Config = require('./config/example');

module.exports = (server, options) => [
  {
    method: 'POST',
    path: '/job',
    config: Config.job
  },
  {
    method: 'POST',
    path: '/service',
    config: Config.service
  },
  {
    method: 'GET',
    path: '/authenticated',
    config: Config.queryAuthentication
  },
  {
    method: 'POST',
    path: '/authenticated',
    config: Config.headerAuthentication
  }
];
