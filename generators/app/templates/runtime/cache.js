'use strict';

const Config = require('../config').cache;
const mainCache = Config && Config.mainCache.name;
// const secondaryCache = Config && Config.secondaryCache.name;
const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

module.exports = {
  pets: {
    find: {
      cache: mainCache,
      expiresIn: 1 * day,
      staleIn: 6 * hour,
      staleTimeout: 500,
      generateTimeout: 5000
    },
    findOne: {
      cache: mainCache,
      expiresIn: 7 * day,
      staleIn: 23 * hour,
      staleTimeout: 300,
      generateTimeout: 1000
    }
  },
  users: {
    find: {
      cache: mainCache,
      expiresIn: 1 * day,
      staleIn: 6 * hour,
      staleTimeout: 500,
      generateTimeout: 5000
    },
    findOne: {
      cache: mainCache,
      expiresIn: 7 * day,
      staleIn: 23 * hour,
      staleTimeout: 300,
      generateTimeout: 1000
    },
    findPets: {
      cache: mainCache,
      expiresIn: 7 * day,
      staleIn: 23 * hour,
      staleTimeout: 300,
      generateTimeout: 1000
    },
    findNotifications: {
      cache: mainCache,
      expiresIn: 7 * day,
      staleIn: 23 * hour,
      staleTimeout: 300,
      generateTimeout: 1000
    }
  }
  // someDomain: {
  //   someMethodName: {
  //     cache: secondaryCache,
  //     expiresIn: 7 * day,
  //     ...
  //   }
  // }
};
