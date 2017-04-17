'use strict';

const jsesc = require('jsesc');

function jsonEscape(str) {
  return jsesc(str, {quotes: 'double'});
}

module.exports = {
  jsonEscape
};
