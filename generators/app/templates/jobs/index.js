'use strict';

const Fs = require('fs');
const Path = require('path');
const Chalk = require('chalk');
const _ = require('lodash');
const Agenda = require('agenda');

exports.register = (server, options, next) => {

  const Config = server.settings.app.jobs;

  if (!Config) {
    return next();
  }

  const address = Config.address;
  const collection = Config.collection;

  const agenda = new Agenda({ db: { address, collection } });

  // register all jobs
  _.each(Fs.readdirSync(Path.resolve(__dirname)), (filename) => {

    let job;

    if (filename !== 'index.js') {
      job = require(`./${filename}`);
      job(server, agenda);
    }
  });

  agenda.on('error', (err) => {

    console.error(Chalk.bgRed.white(err));
  });

  agenda.on('ready', () => {

    if (server.settings.app.env !== 'test') {
      console.log(Chalk.bgGreen.white('Job queue starting up...'));
    }

    const recurringJobs = _(server.plugins.runtime.jobs)
      .values()
      .filter((job) => job.FREQUENCY && job.NAME && job.TYPE === 'recurring')
      .value();

    // start all recurring jobs when queue is ready
    _.each(recurringJobs, (recurringJob) => {

      agenda.every(recurringJob.FREQUENCY, recurringJob.NAME);
    });

    agenda.start();
  });

  agenda.processEvery(Config.frequency).maxConcurrency(Config.concurrency);

  // decorate server so we can access server.jobs later
  server.decorate('server', 'jobs', agenda);

  next();
};

exports.register.attributes = {
  name: 'jobs-plugin'
};
