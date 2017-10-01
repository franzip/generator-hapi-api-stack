// async recurring job example using a registered service

'use strict';

const _ = require('lodash');

module.exports = (server, agenda) => {

  const jobName = server.plugins.runtime.jobs.petsMatcher.NAME;
  const jobConfig = server.plugins.runtime.jobs.petsMatcher.CONFIG || {};

  agenda.define(jobName, jobConfig, (job, done) => {

    server.seneca.act({ role: 'pets-matcher', cmd: 'matchPetsWithUsers' }, (err, assignmentCount) => {

      if (err) {
        return done(err);
      }

      job.attrs.data = assignmentCount;
      done();
    });
  });

  agenda.on(`success:${jobName}`, (job) => {

    const data = job.attrs.data;
    const petsCount = _.sum(_.values(data));
    const usersCount = Object.keys(data).length;

    server.log(['info', 'jobs'], `${petsCount} pets assigned to ${usersCount} users`);
    // write notifications on job success
    server.seneca.act({ role: 'notifier', cmd: 'notifyUsers', data });
  });

  agenda.on(`fail:${jobName}`, (job) => {

    server.log(['error', 'jobs'], `An error occurred processing Job with ID ${job.attrs._id}`);
  });
};
