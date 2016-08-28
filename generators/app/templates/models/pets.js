'use strict';

module.exports = {

  identity: 'pets',
  tableName: 'pets',

  connection: '<%= dbConnectionName %>',

  attributes: {
    type: {
      type: 'string',
      required: true
    },
    name: {
      type: 'string',
      required: true
    },
    // belongs to
    userId: {
      type: 'string',
      model: 'users',
      required: false
    }
  },

  autoPK: true,

  autoCreatedAt: true,
  autoUpdatedAt: true
};
