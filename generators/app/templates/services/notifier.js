'use strict';

const _ = require('lodash');

module.exports = (server, options) => {

  server.seneca.add({ role: 'notifier', cmd: 'notifyUsers' }, (message, next) => {

    let text;
    const Notifications = server.waterline.collections.notifications;
    const notifications = _(Object.keys(message.data))
      .map((userId) => {

        text = `${message.data[userId]} pets assigned to your account`;
        return { userId, text };
      })
      .value();


    Notifications
    .create(notifications)
    .exec((err, results) => next(err || results));
  });
};
