'use strict';

const _ = require('lodash');

const gracefulShutdown = (server) => {

  if (server.settings.app.env !== 'test') {
    server.log(['info', 'shutdown', 'jobs'], 'Shutting down...');
  }

  server.jobs && server.jobs.stop(() => {

    if (server.settings.app.env !== 'test') {
      server.log(['info', 'shutdown', 'jobs'], 'Shutting down job queue...');
    }

    process.exit(0);
  });
};

exports.register = (server, options, next) => {

  if (server.settings.app.env !== 'test') {
    server.log(['info', 'bootstrap'], 'Registering shutdown cleanup...');
  }

  process.on('SIGTERM', _.bind(gracefulShutdown, null, server));
  process.on('SIGINT', _.bind(gracefulShutdown, null, server));

  next();
};

exports.register.attributes = {
  name: 'shutdown-plugin'
};
