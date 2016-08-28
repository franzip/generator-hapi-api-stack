'use strict';

const Validations = require('../validations/users');
const Handlers = require('../handlers/users');

module.exports = {
  find: {
    validate: Validations.find,
    pre: [
      { method: 'users.find(query)', assign: 'users' }
    ],
    handler: Handlers.find
  },

  create: {
    validate: Validations.create,
    pre: [
      { method: 'users.create(payload)', assign: 'user' },
      { method: 'utils.buildResourceLocation(path, pre.user.id)', assign: 'location' }
    ],
    handler: Handlers.create
  },

  findOne: {
    validate: Validations.findOne,
    pre: [
      { method: 'users.findOne(params.id)', assign: 'user' }
    ],
    handler: Handlers.findOne
  },

  findPets: {
    validate: Validations.findPets,
    pre: [
      { method: 'users.findPets(params.id)', assign: 'pets' }
    ],
    handler: Handlers.findPets
  },

  findNotifications: {
    validate: Validations.findNotifications,
    pre: [
      { method: 'users.findNotifications(params.id)', assign: 'notifications' }
    ],
    handler: Handlers.findNotifications
  },

  edit: {
    validate: Validations.edit,
    pre: [
      { method: 'users.edit(params.id, payload)', assign: 'user' }
    ],
    handler: Handlers.edit
  },

  destroy: {
    validate: Validations.destroy,
    pre: ['users.destroy(params.id)'],
    handler: Handlers.destroy
  }
};
