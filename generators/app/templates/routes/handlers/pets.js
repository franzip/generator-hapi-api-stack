'use strict';

module.exports = {
  find: (request, reply) => reply(request.pre.pets),
  create: (request, reply) => reply(request.pre.pet).created(request.pre.location),
  findOne: (request, reply) => reply(request.pre.pet),
  edit: (request, reply) => reply(request.pre.pet),
  destroy: (request, reply) => reply().code(204)
};
