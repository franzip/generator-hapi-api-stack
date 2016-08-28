'use strict';

const Chalk = require('chalk');
const Path = require('path');
const Fs = require('fs');
const _ = require('lodash');

exports.register = (server, options, next) => {

  if (server.settings.app.env !== 'test') {
    console.log(Chalk.bgGreen.white('Registering authentication strategies...'));
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
