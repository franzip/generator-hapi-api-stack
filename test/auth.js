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

describe('generator-hapi-api-stack:auth', () => {

  const prompts = {
    strategyName: 'authStrategy',
    pluginName: 'bearer-access-token'
  };

  const tmpFolder = path.join(process.cwd(), './temp');
  const prefixTemp = (filename) => path.join(tmpFolder, filename);
  const filename = _.kebabCase(prompts.strategyName) + '.js';
  const expected = prefixTemp(`auth/${filename}`);

  before((done) => {
    helpers.run(path.join(__dirname, '../generators/auth'))
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

  it('fills the authentication file with correct information', (done) => {
    const regex = new RegExp(`'${prompts.strategyName}'\, '${prompts.pluginName}'\, {}`);

    assert.fileContent(expected, regex);

    done();
  });
});
