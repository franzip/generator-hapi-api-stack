'use strict';

const Async = require('async');
const _ = require('lodash');

module.exports = (server, options) => {
  // assign random userId to pets who don't have one
  server.seneca.add({ role: 'pets-matcher', cmd: 'matchPetsWithUsers' }, (message, next) => {

    const Pets = server.waterline.collections.pets;
    const Users = server.waterline.collections.users;

    Async.series({
      usersIds: (cb) => {

        Users
        .find({}, { select: ['id'] })
        .exec((err, users) => {

          if (err) {
            return cb(err);
          }
          cb(null, _.map(users, 'id'));
        });
      },

      petsIds: (cb) => {

        Pets
        .find({ userId: { $exists: false } }, { select: ['id'] })
        .exec((err, pets) => {

          if (err) {
            return cb(err);
          }
          cb(null, _.map(pets, 'id'));
        });
      }
    }, (err, ids) => {

      if (err) {
        return next(err);
      }

      const usersIds = ids.usersIds;
      const petsIds = ids.petsIds;

      if (!usersIds.length || !petsIds.length) {
        return next(null, []);
      }

      let userId;

      Async.reduce(petsIds, {}, (assignmentCount, id, cb) => {

        userId = _.sample(usersIds);

        Pets
        .update({ id }, { userId })
        .exec((err, result) => {

          if (err) {
            return cb(err);
          }
          assignmentCount[userId] = assignmentCount[userId] + 1 || 1;
          cb(null, assignmentCount);
        });
      }, (err, results) => {

        if (err) {
          return next(err);
        }

        return next(null, results);
      });
    });
  });
};
