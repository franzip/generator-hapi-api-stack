'use strict';

const Validations = require('../validations/pets');
const Handlers = require('../handlers/pets');

module.exports = {
  find: {
    validate: Validations.find,
    pre: [
      { method: 'pets.find(query)', assign: 'pets' }
    ],
    handler: Handlers.find
  },

  create: {
    validate: Validations.create,
    pre: [
      { method: 'pets.create(payload)', assign: 'pet' },
      { method: 'utils.buildResourceLocation(path, pre.pet.id)', assign: 'location' }
    ],
    handler: Handlers.create
  },

  findOne: {
    validate: Validations.findOne,
    pre: [
      { method: 'pets.findOne(params.id)', assign: 'pet' }
    ],
    handler: Handlers.findOne
  },

  edit: {
    validate: Validations.edit,
    pre: [
      { method: 'pets.edit(params.id, payload)', assign: 'pet' }
    ],
    handler: Handlers.edit
  },

  destroy: {
    validate: Validations.destroy,
    pre: ['pets.destroy(params.id)'],
    handler: Handlers.destroy
  }
};
