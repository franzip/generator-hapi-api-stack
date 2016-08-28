'use strict';

const Chalk = require('chalk');
const _ = require('lodash');

const gracefulShutdown = (server) => {

  if (server.settings.app.env !== 'test') {
    console.log(Chalk.bgGreen.white('Shutting down...'));
  }

  server.jobs && server.jobs.stop(() => {

    if (server.settings.app.env !== 'test') {
      console.log(Chalk.bgGreen.white('Shutting down job queue...'));
    }

    process.exit(0);
  });
};

exports.register = (server, options, next) => {

  if (server.settings.app.env !== 'test') {
    console.log(Chalk.bgGreen.white('Registering shutdown cleanup...'));
  }

  process.on('SIGTERM', _.bind(gracefulShutdown, null, server));
  process.on('SIGINT', _.bind(gracefulShutdown, null, server));

  next();
};

exports.register.attributes = {
  name: 'shutdown-plugin'
};
