'use strict';

const Path = require('path');
const Fs = require('fs');
const _ = require('lodash');

exports.register = (server, options, next) => {

  if (server.settings.app.env !== 'test') {
    server.log(['info', 'bootstrap', 'auth'], 'Registering authentication strategies...');
  }

  let strategies;

  _.each(Fs.readdirSync(Path.resolve(__dirname)), (filename) => {

    if (filename !== 'index.js') {
      strategies = require(`./${filename}`);
      strategies(server, options);
    }
  });

  next();
};

exports.register.attributes = {
  name: 'auth-plugin'
};
