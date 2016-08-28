'use strict';

const Code = require('code');
const Lab = require('lab');
const LabbableServer = require('../server.js');

const lab = exports.lab = Lab.script();
const describe = lab.describe;
const it = lab.it;
const before = lab.before;
const after = lab.after;
const expect = Code.expect;

describe(('server'), () => {

  let server;

  before((done) => {

    LabbableServer.ready((err, srv) => {

      expect(err).to.not.exist();

      if (err) {
        done(err);
      }

      server = srv;

      done();
    });
  });

  after((done) => {

    server = null;
    done();
  });

  it('initializes.', (done) => {

    expect(server).to.exist();
    expect(LabbableServer.isInitialized()).to.equal(true);
    done();
  });

  it('create pets', (done) => {

    let response;

    server.inject({ method: 'POST', url: '/pets', payload: { name: 'Fido', type: 'dog' } }, (res) => {

      response = JSON.parse(res.payload);
      expect(res.statusCode).to.equal(201);
      expect(response.id).to.be.a.string();
      expect(response.createdAt).to.be.a.string();
      expect(response.updatedAt).to.be.a.string();
      expect(response.name).to.equal('Fido');
      expect(response.type).to.equal('dog');
      done();
    });
  });

  it('gets pets', (done) => {

    let response;

    server.inject({ method: 'GET', url: '/pets' }, (res) => {

      response = JSON.parse(res.payload);
      expect(res.statusCode).to.equal(200);
      expect(response).to.be.an.array();
      done();
    });
  });
});
