'use strict';

module.exports = {
  pets: {
    DEFAULT_LIMIT: 10,
    DEFAULT_OFFSET: 0,
    ALLOWED_TYPES: [
      'dog',
      'cat'
    ]
  },
  users: {
    DEFAULT_LIMIT: 10,
    DEFAULT_OFFSET: 0,
    VALID_USERNAME: /^[a-z][a-z0-9_]{4,}$/
  }
  // someDomain: {
  //   SOME_PARAM: ...
  //   ...
  // }
};
