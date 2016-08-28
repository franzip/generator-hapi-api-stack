'use strict';

module.exports = {
  petsMatcher: {
    NAME: 'petsMatcher',
    TYPE: 'recurring',
    FREQUENCY: '1 minute',
    CONFIG: {}
  },
  petsType: {
    NAME: 'petsType',
    TYPE: 'manual',
    CONFIG: {
      concurrency: 1,
      priority: 'high'
    }
  }
  // recurringJob: {
  //   NAME: 'recurringJob', | must match object key
  //   TYPE: 'recurring',    | required
  //   FREQUENCY: '1 hour',  | required for recurring jobs
  //   CONFIG: {}            | optional
  // },
  // manualJob: {
  //   NAME: 'manualJob',    | must match object key
  //   TYPE: 'manual',       | required
  //   CONFIG: {}            | optional
  // }
};
