'use strict';

const Path = require('path');
const Fs = require('fs');
const _ = require('lodash');

exports.register = (server, options, next) => {

  if (server.settings.app.env !== 'test') {
    server.log(['info', 'bootstrap', 'routing'], 'Mounting routes...');
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
