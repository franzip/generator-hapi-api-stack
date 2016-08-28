'use strict';

const Chalk = require('chalk');
const Path = require('path');
const Fs = require('fs');
const _ = require('lodash');

exports.register = (server, options, next) => {

  if (server.settings.app.env !== 'test') {
    console.log(Chalk.bgGreen.white('Mounting routes...'));
  }

  let routes;

  _.each(Fs.readdirSync(Path.resolve(__dirname)), (filename) => {

    const toExclude = /config|handlers|validations|index/;

    if (!toExclude.test(filename)) {
      routes = require(`./${filename}`);
      server.route(routes(server, options));
    }
  });

  next();
};

exports.register.attributes = {
  name: 'routes-plugin'
};
