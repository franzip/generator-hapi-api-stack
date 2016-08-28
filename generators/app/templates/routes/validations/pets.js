'use strict';

const Joi = require('joi');
const Config = require('../../runtime/routes').pets;

module.exports = {
  find: {
    query: {
      limit: Joi.number().integer().min(0).default(Config.DEFAULT_LIMIT),
      offset: Joi.number().integer().min(0).default(Config.DEFAULT_OFFSET)
    }
  },

  create: {
    payload: {
      type: Joi.string().valid(Config.ALLOWED_TYPES).required(),
      name: Joi.string().required(),
      userId: Joi.string().optional()
    }
  },

  findOne: {
    params: {
      id: Joi.string().required()
    }
  },

  edit: {
    params: {
      id: Joi.string().required()
    },
    payload: {
      type: Joi.string().valid(Config.ALLOWED_TYPES).optional(),
      name: Joi.string().optional(),
      userId: Joi.string().optional()
    }
  },

  destroy: {
    params: {
      id: Joi.string().required()
    }
  }
};
