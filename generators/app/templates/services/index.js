'use strict';

const Path = require('path');
const Fs = require('fs');
const _ = require('lodash');

exports.register = (server, options, next) => {

  if (server.settings.app.env !== 'test') {
    server.log(['info', 'bootstrap', 'services'], 'Loading services...');
  }

  let services;

  _.each(Fs.readdirSync(Path.resolve(__dirname)), (filename) => {

    if (filename !== 'index.js') {
      services = require(`./${filename}`);
      services(server, options);
    }
  });

  next();
};

exports.register.attributes = {
  name: 'services-plugin'
};
