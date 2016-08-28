'use strict';

const Joi = require('joi');
const Config = require('../../runtime/routes').users;

module.exports = {
  find: {
    query: {
      limit: Joi.number().integer().min(0).default(Config.DEFAULT_LIMIT),
      offset: Joi.number().integer().min(0).default(Config.DEFAULT_OFFSET)
    }
  },

  create: {
    payload: {
      username: Joi.string().regex(Config.VALID_USERNAME).required()
    }
  },

  findOne: {
    params: {
      id: Joi.string().required()
    }
  },

  findPets: {
    params: {
      id: Joi.string().required()
    }
  },

  findNotifications: {
    params: {
      id: Joi.string().required()
    }
  },

  edit: {
    params: {
      id: Joi.string().required()
    },
    payload: {
      username: Joi.string().regex(Config.VALID_USERNAME).optional()
    }
  },

  destroy: {
    params: {
      id: Joi.string().required()
    }
  }
};
