'use strict';

const Config = require('./config/pets');

module.exports = (server, options) => [
  {
    method: 'GET',
    path: '/pets',
    config: Config.find
  },
  {
    method: 'POST',
    path: '/pets',
    config: Config.create
  },
  {
    method: 'GET',
    path: '/pets/{id}',
    config: Config.findOne
  },
  {
    method: 'PATCH',
    path: '/pets/{id}',
    config: Config.edit
  },
  {
    method: 'DELETE',
    path: '/pets/{id}',
    config: Config.destroy
  }
];
