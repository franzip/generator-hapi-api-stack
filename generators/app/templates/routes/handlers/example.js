'use strict';

const Boom = require('boom');

module.exports = {
  // create a manual job on request
  job: (request, reply) => {

    const jobName = request.server.plugins.runtime.jobs.petsType.NAME;
    const jobs = request.server.jobs;
    const type = request.payload.type;
    const petsTypeJob = jobs.create(jobName, { type });

    petsTypeJob.save((err) => {

      const response = err ? reply(Boom.badImplementation()) : reply().created();
      return response;
    });
  },
  // use a registered service to handle the request
  service: (request, reply) => reply.act({ generate: 'id' }),
  queryAuthentication: (request, reply) => reply('query authenticated!'),
  headerAuthentication: (request, reply) => reply('header authenticated!')
};
