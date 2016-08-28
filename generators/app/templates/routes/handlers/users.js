'use strict';

module.exports = {
  find: (request, reply) => reply(request.pre.users),
  create: (request, reply) => reply(request.pre.user).created(request.pre.location),
  findOne: (request, reply) => reply(request.pre.user),
  findPets: (request, reply) => reply(request.pre.pets),
  findNotifications: (request, reply) => reply(request.pre.notifications),
  edit: (request, reply) => reply(request.pre.user),
  destroy: (request, reply) => reply().code(204)
};
