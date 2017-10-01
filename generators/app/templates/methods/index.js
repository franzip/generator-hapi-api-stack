'use strict';

const Path = require('path');
const Fs = require('fs');
const _ = require('lodash');

exports.register = (server, options, next) => {

  if (server.settings.app.env !== 'test') {
    server.log(['info', 'boostrap', 'methods'], 'Loading server methods...');
  }

  let methods;

  _.each(Fs.readdirSync(Path.resolve(__dirname)), (filename) => {

    if (filename !== 'index.js') {
      methods = require(`./${filename}`);
      server.method(methods(server, options));
    }
  });

  next();
};

exports.register.attributes = {
  name: 'methods-plugin'
};
