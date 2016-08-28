'use strict';

module.exports = (server, options) => [
  {
    name: 'utils.buildResourceLocation',
    method: buildResourceLocation
  }
];

const buildResourceLocation = (path, resourceId, next) => next(null, `${path}/${resourceId}`);
