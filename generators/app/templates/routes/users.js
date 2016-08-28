'use strict';

const Config = require('./config/users');

module.exports = (server, options) => [
  {
    method: 'GET',
    path: '/users',
    config: Config.find
  },
  {
    method: 'POST',
    path: '/users',
    config: Config.create
  },
  {
    method: 'GET',
    path: '/users/{id}',
    config: Config.findOne
  },
  {
    method: 'GET',
    path: '/users/{id}/pets',
    config: Config.findPets
  },
  {
    method: 'GET',
    path: '/users/{id}/notifications',
    config: Config.findNotifications
  },
  {
    method: 'PATCH',
    path: '/users/{id}',
    config: Config.edit
  },
  {
    method: 'DELETE',
    path: '/users/{id}',
    config: Config.destroy
  }
];
