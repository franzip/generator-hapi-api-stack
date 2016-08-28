'use strict';

const Path = require('path');
const Fs = require('fs');
const _ = require('lodash');

module.exports = [];

let modelObject;

_.each(Fs.readdirSync(__dirname), (file) => {

  if (file !== 'index.js') {
    modelObject = require(Path.join(__dirname, file));
    module.exports.push(modelObject);
  }
});
