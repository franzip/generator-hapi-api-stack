// async manual job example

'use strict';

module.exports = (server, agenda) => {

  const Pets = server.waterline.collections.pets;
  const jobName = server.plugins.runtime.jobs.petsType.NAME;
  const jobConfig = server.plugins.runtime.jobs.petsType.CONFIG || {};

  // change all pets type
  agenda.define(jobName, jobConfig, (job, done) => {

    const type = job.attrs.data.type;

    Pets
    .update({}, { type })
    .exec((err, pets) => {

      if (err) {
        done(err);
      }

      done();
    });
  });

  agenda.on(`success:${jobName}`, (job) => {

    server.log(['info', 'jobs'], `Job with ID ${job.attrs._id} executed with success`);

    // remove manual job once done
    job.remove((err) => {

      if (err) {
        server.log(['error', 'jobs'], 'An error occurred removing the job');
      }
      else {
        server.log(['info', 'jobs'], 'Job removed successfully');
      }
    });
  });

  agenda.on(`fail:${jobName}`, (job) => {

    server.log(['error', 'jobs'], `An error occurred processing Job with ID ${job.attrs._id}`);

    // remove manual job once done
    job.remove((err) => {

      if (err) {
        server.log(['error', 'jobs'], 'An error occurred removing the job');
      }
      else {
        server.log(['info', 'jobs'], 'Job removed successfully');
      }
    });
  });
};
