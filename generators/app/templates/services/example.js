'use strict';

module.exports = (server, options) => {

  let id = 0;

  server.seneca.add({ generate: 'id' }, (message, next) => next(null, { id: ++id }));
};
