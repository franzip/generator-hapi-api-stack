'use strict';

module.exports = {
  notifications: [
    {
      keys: { type: 1 },
      options: { background: true, unique: false, sparse: false }
    }
  ],
  pets: [
    {
      keys: { userId: 1 },
      options: { background: true, unique: false, sparse: false }
    }
  ],
  users: [
    {
      keys: { username: 1 },
      options: { background: true, unique: true, sparse: false }
    }
  ]
  // modelName: [
  //   {
  //     keys: { keyToIndex: 1 },
  //     options: { background: true, unique: true, sparse: false }
  //   }
  // ],
};
