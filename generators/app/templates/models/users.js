'use strict';

module.exports = {

  identity: 'users',
  tableName: 'users',

  connection: '<%= dbConnectionName %>',

  attributes: {
    username: {
      type: 'string',
      required: true
    },
    // has many
    pets: {
      collection: 'pets',
      via: 'userId'
    },
    notifications: {
      collection: 'notifications',
      via: 'userId'
    }
  },

  autoPK: true,

  autoCreatedAt: true,
  autoUpdatedAt: true
};
