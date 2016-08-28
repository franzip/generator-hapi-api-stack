'use strict';

const Chalk = require('chalk');
const Boom = require('boom');
const _ = require('lodash');

module.exports = (server, options) => [
  {
    name: 'pets.find',
    method: find,
    options: {
      bind: server.waterline.collections.pets,
      cache: server.plugins.runtime.cache.pets.find.cache ? server.plugins.runtime.cache.pets.find : undefined,
      generateKey: (opts) => JSON.stringify(opts)
    }
  },
  {
    name: 'pets.findOne',
    method: findOne,
    options: {
      bind: server.waterline.collections.pets,
      cache: server.plugins.runtime.cache.pets.findOne.cache ? server.plugins.runtime.cache.pets.findOne : undefined,
      generateKey: (opts) => JSON.stringify(opts)
    }
  },
  {
    name: 'pets.create',
    method: create,
    options: {
      bind: server.waterline.collections.pets
    }
  },
  {
    name: 'pets.edit',
    method: edit,
    options: {
      bind: server.waterline.collections.pets
    }
  },
  {
    name: 'pets.destroy',
    method: destroy,
    options: {
      bind: server.waterline.collections.pets
    }
  }
];

const find = function find(query, next) {

  this
  .find({ limit: query.limit, skip: query.offset })
  .exec((err, pets) => {

    if (err) {
      console.error(Chalk.bgRed.white(err));
      return next(Boom.badImplementation());
    }
    return next(null, pets);
  });
};

const findOne = function findOne(id, next) {

  this
  .findOneById(id)
  .exec((err, pet) => {

    if (err) {
      console.error(Chalk.bgRed.white(err));
      return next(Boom.badImplementation());
    }
    if (!pet) {
      return next(Boom.notFound('Pet not found'));
    }
    return next(null, pet);
  });
};

const create = function create(data, next) {

  this
  .create(data)
  .exec((err, pet) => {

    if (err) {
      console.error(Chalk.bgRed.white(err));
      return next(Boom.badImplementation());
    }
    return next(null, pet);
  });
};

const edit = function edit(id, data, next) {

  this
  .update({ id }, data)
  .exec((err, pet) => {

    if (err) {
      console.error(Chalk.bgRed.white(err));
      return next(Boom.badImplementation());
    }
    if (!pet.length) {
      return next(Boom.notFound('Pet not found'));
    }
    return next(null, _.head(pet));
  });
};

const destroy = function destroy(id, next) {

  this
  .destroy({ id }, (err) => {

    if (err) {
      console.error(Chalk.bgRed.white(err));
      return next(Boom.badImplementation());
    }
    return next();
  });
};
