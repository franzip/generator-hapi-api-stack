'use strict';

const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const _ = require('lodash');
const rimraf = require('rimraf');
let lab = require('lab');
lab = exports.lab = lab.script();
const describe = lab.describe;
const it = lab.it;
const before = lab.before;
const after = lab.after;

describe('generator-hapi-api-stack:service', () => {

  const prompts = {
    serviceName: 'my awesome service'
  };

  const serviceName = _.camelCase(prompts.serviceName);
  const tmpFolder = path.join(process.cwd(), './temp');
  const prefixTemp = (filename) => path.join(tmpFolder, filename);
  const filename = _.kebabCase(prompts.serviceName) + '.js';

  const expected = prefixTemp(`services/${filename}`);

  before((done) => {
    helpers.run(path.join(__dirname, '../generators/service'))
      .inDir(tmpFolder)
      .withPrompts(prompts)
      .on('end', done);
  });

  after((done) => {
    rimraf(tmpFolder, done);
  });

  it('creates files', (done) => {

    assert.file(expected);

    done();
  });

  it('fills the service file with correct information', (done) => {
    const regex = new RegExp(`role: '${serviceName}'`);

    assert.fileContent(expected, regex);

    done();
  });
});
