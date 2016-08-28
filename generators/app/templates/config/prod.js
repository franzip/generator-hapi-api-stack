'use strict';

module.exports = {
  env: 'production',

  product: {
    name: '<%= projectName %>'
  },

  server: {
    <%= projectName %>: {
      host: '0.0.0.0',
      port: process.env.PORT || 3000,
      tls: false
    }
  },

  chairo: {
    options: {
      // prevent seneca timeout error
      // https://github.com/senecajs/seneca-transport/issues/23
      timeout: 999999999
    }
  },

  cache: {
    mainCache: {
      engine: 'catbox-memory',
      name: 'mainCache',
      partition: '<%= kebabRepoName %>'
    }
  },

  dogwater: {
    connections: {
      <%= dbConnectionName %>: {
        adapter: 'sails-mongo',
        host: 'localhost',
        port: 27017,
        database: '<%= dbName %>'
      }
    },
    adapters: {
      'sails-mongo': require('sails-mongo')
    },
    models: require('path').resolve(__dirname, '..', 'models')
  },

  jobs: {
    address: 'mongodb://localhost:27017/<%= dbName %>',
    collection: 'jobs',
    frequency: '5 minutes',
    concurrency: 20
  },

  apiPrefix: '<%= apiPrefix %>',

  deploy: {
    branch: 'master',
    servers: '<%= user %>@vm-address-here.com',
    deployTo: '/home/<%= user %>/<%= projectName %>'
  }
};
