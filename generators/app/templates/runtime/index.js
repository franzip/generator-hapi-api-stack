'use strict';

const Chalk = require('chalk');
const Path = require('path');
const Fs = require('fs');
const _ = require('lodash');

exports.register = (server, options, next) => {

  if (server.settings.app.env !== 'test') {
    console.log(Chalk.bgGreen.white('Saving runtime configuration...'));
  }

  let key;

  _.each(Fs.readdirSync(Path.resolve(__dirname)), (filename) => {

    if (filename !== 'index.js') {
      key = filename.replace(/\.js/, '');
      server.expose(key, require(`./${key}`));
    }
  });

  next();
};

exports.register.attributes = {
  name: 'runtime'
};
