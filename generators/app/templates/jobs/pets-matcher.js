// async recurring job example using a registered service

'use strict';

const Chalk = require('chalk');
const _ = require('lodash');

module.exports = (server, agenda) => {

  const jobName = server.plugins.runtime.jobs.petsMatcher.NAME;
  const jobConfig = server.plugins.runtime.jobs.petsMatcher.CONFIG || {};

  agenda.define(jobName, jobConfig, (job, done) => {

    server.seneca.act({ role: 'pets-matcher', cmd: 'matchPetsWithUsers' }, (err, assignmentCount) => {

      if (err) {
        done(err);
      }

      job.attrs.data = assignmentCount;
      done();
    });
  });

  agenda.on(`success:${jobName}`, (job) => {

    const data = job.attrs.data;
    const petsCount = _.sum(_.values(data));
    const usersCount = Object.keys(data).length;

    console.log(Chalk.bgGreen.white(`${petsCount} pets assigned to ${usersCount} users`));
    // write notifications on job success
    server.seneca.act({ role: 'notifier', cmd: 'notifyUsers', data });
  });

  agenda.on(`fail:${jobName}`, (job) => {

    console.log(Chalk.bgGreen.white(`An error occurred processing Job with ID ${job.attrs._id}`));
  });
};
