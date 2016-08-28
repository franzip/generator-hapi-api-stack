'use strict';

let prefix = require('../config').apiPrefix;

exports.register = (server, options, next) => {

  prefix = prefix === '' ? undefined : prefix;

  server.dependency('dogwater', (server, next) => {

    server.register([
      {
        register: require('../runtime')
      },
      {
        register: require('../db')
      },
      {
        register: require('../auth')
      },
      {
        register: require('../methods')
      },
      {
        register: require('../services')
      },
      {
        register: require('../routes'),
        routes: { prefix }
      },
      {
        register: require('../jobs')
      },
      {
        register: require('./shutdown')
      }
    ], (err) => {

      if (err) {
        return next(err);
      }
    });

    next();
  });

  next();
};

exports.register.attributes = {
  pkg: require('../package.json')
};
