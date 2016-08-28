'use strict';

const validateQueryFunc = function validateQueryFunc(token, cb) {
  // GET /authenticated?access_token=1234
  if (token === '1234') {
    return cb(null, true, { token });
  }

  return cb(null, false, { token });
};

const validateHeaderFunc = function validateHeaderFunc(token, cb) {
  // POST /authenticated
  // ...
  // headers: { Bearer: 'John', Authorization: 'token 1234'}
  const user = this.headers.bearer;

  if (token === '1234' && user === 'John') {
    return cb(null, true, { token });
  }

  return cb(null, false, { token });
};

module.exports = (server, options) => {

  server.auth.strategy('queryExample', 'bearer-access-token', {
    allowQueryToken: true,
    allowMultipleHeaders: false,
    accessTokenName: 'access_token',
    validateFunc: validateQueryFunc
  });

  server.auth.strategy('headerExample', 'bearer-access-token', {
    allowQueryToken: false,
    allowMultipleHeaders: true,
    accessTokenName: 'token',
    tokenType: 'token',
    validateFunc: validateHeaderFunc
  });
};
