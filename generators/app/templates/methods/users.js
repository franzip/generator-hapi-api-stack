'use strict';

const Chalk = require('chalk');
const Boom = require('boom');
const _ = require('lodash');

module.exports = (server, options) => [
  {
    name: 'users.find',
    method: find,
    options: {
      bind: server.waterline.collections.users,
      cache: server.plugins.runtime.cache.users.find.cache ? server.plugins.runtime.cache.users.find : undefined,
      generateKey: (opts) => JSON.stringify(opts)
    }
  },
  {
    name: 'users.findOne',
    method: findOne,
    options: {
      bind: server.waterline.collections.users,
      cache: server.plugins.runtime.cache.users.findOne.cache ? server.plugins.runtime.cache.users.findOne : undefined,
      generateKey: (opts) => JSON.stringify(opts)
    }
  },
  {
    name: 'users.findPets',
    method: findPets,
    options: {
      bind: server.waterline.collections.users,
      cache: server.plugins.runtime.cache.users.findPets.cache ? server.plugins.runtime.cache.users.findPets : undefined,
      generateKey: (opts) => JSON.stringify(opts)
    }
  },
  {
    name: 'users.findNotifications',
    method: findNotifications,
    options: {
      bind: server.waterline.collections.users,
      cache: server.plugins.runtime.cache.users.findNotifications.cache ? server.plugins.runtime.cache.users.findNotifications : undefined,
      generateKey: (opts) => JSON.stringify(opts)
    }
  },
  {
    name: 'users.create',
    method: create,
    options: {
      bind: server.waterline.collections.users
    }
  },
  {
    name: 'users.edit',
    method: edit,
    options: {
      bind: server.waterline.collections.users
    }
  },
  {
    name: 'users.destroy',
    method: destroy,
    options: {
      bind: server.waterline.collections.users
    }
  }
];

const find = function find(query, next) {

  this
  .find({ limit: query.limit, skip: query.offset })
  .exec((err, users) => {

    if (err) {
      console.error(Chalk.bgRed.white(err));
      return next(Boom.badImplementation());
    }
    return next(null, users);
  });
};

const findOne = function findOne(id, next) {

  this
  .findOneById(id)
  .exec((err, user) => {

    if (err) {
      console.error(Chalk.bgRed.white(err));
      return next(Boom.badImplementation());
    }
    if (!user) {
      return next(Boom.notFound('User not found'));
    }
    return next(null, user);
  });
};

const findPets = function findPets(id, next) {

  this
  .findOneById(id)
  .populate('pets')
  .exec((err, user) => {

    if (err) {
      console.error(Chalk.bgRed.white(err));
      return next(Boom.badImplementation());
    }
    if (!user) {
      return next(Boom.notFound('User not found'));
    }
    return next(null, user);
  });
};

const findNotifications = function findNotifications(id, next) {

  this
  .findOneById(id)
  .populate('notifications')
  .exec((err, user) => {

    if (err) {
      console.error(Chalk.bgRed.white(err));
      return next(Boom.badImplementation());
    }
    if (!user) {
      return next(Boom.notFound('User not found'));
    }
    return next(null, user);
  });
};

const create = function create(data, next) {

  this
  .create(data)
  .exec((err, user) => {

    if (err) {
      console.error(Chalk.bgRed.white(err));
      return next(Boom.badImplementation());
    }
    return next(null, user);
  });
};

const edit = function edit(id, data, next) {

  this
  .update({ id }, data)
  .exec((err, user) => {

    if (err) {
      console.error(Chalk.bgRed.white(err));
      return next(Boom.badImplementation());
    }
    if (!user.length) {
      return next(Boom.notFound('User not found'));
    }
    return next(null, _.head(user));
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
