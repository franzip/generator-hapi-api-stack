'use strict';

const env = require('get-env')({
  staging: 'staging',
  test: 'test'
});

// this load the correct env config at runtime based on NODE_ENV
// defaults to 'dev'
module.exports = require(`./config/${env}`);
