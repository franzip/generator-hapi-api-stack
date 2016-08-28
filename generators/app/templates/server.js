'use strict';

const Path = require('path');
const Glue = require('glue');
const Chalk = require('chalk');
const Labbable = require('labbable');
const Config = require('./config');
const ServerConfig = Config.server.<%= projectName %>;

ServerConfig.uri = (ServerConfig.tls ? 'https://' : 'http://') +
  `${ServerConfig.host}:${ServerConfig.port}`;

const manifest = {
  server: {
    app: Config
  },

  connections: [
    {
      host: ServerConfig.host,
      port: ServerConfig.port
    }
  ],

  registrations: [
    {
      plugin: {
        register: 'hapi-auth-bearer-token'
      }
    },
    {
      plugin: {
        register: 'chairo',
        options: Config.chairo
      }
    },
    {
      plugin: {
        register: 'dogwater',
        options: Config.dogwater
      }
    },
    {
      plugin: {
        register: '../lib'
      }
    }
  ]
};

// set cache config as array to allow multiple caches to be used
if (Config.cache) {
  const caches = [];
  Object.keys(Config.cache).forEach((key) => {

    caches.push(Config.cache[key]);
  });

  manifest.server.cache = caches;
}

// export a labbable server for testing purposes
const labbable = module.exports = new Labbable();

const opts = { relativeTo: Path.join(__dirname, 'node_modules') };

Glue.compose(manifest, opts, (err, server) => {

  if (err) {
    throw err;
  }

  const bootMessage = `${Chalk.bgGreen.white('Server started with success!')}\n
${Chalk.bgGreen.white(Config.product.name + ' is listening on')} ${Chalk.white.underline(ServerConfig.uri)}\n
${Chalk.bgGreen.white('Environment: ' + Config.env)}`;

  labbable.using(server);

  server.initialize((err) => {

    if (err) {
      throw err;
    }

    server.start((err) => {

      if (err) {
        throw err;
      }
      setTimeout(() => {

        console.log(bootMessage);
      }, 2000);
    });
  });
});
