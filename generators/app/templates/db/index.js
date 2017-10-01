'use strict';

const _ = require('lodash');

exports.register = (server, options, next) => {

  if (server.settings.app.env === 'test') {
    return next();
  }

  server.log(['info', 'bootstrap', 'database'], 'Configuring databases...');

  const indexesConfig = require('./indexes');
  const collections = Object.keys(indexesConfig);

  let collection;

  _.each(collections, (collectionName) => {

    collection = server.waterline.collections[collectionName];

    _.each(indexesConfig[collectionName], (configObj) => {

      collection.native((err, rawCollection) => {

        if (err) {
          throw err;
        }

        rawCollection.createIndex(configObj.keys, configObj.options);
      });
    });
  });

  next();
};

exports.register.attributes = {
  name: 'db-plugin'
};
