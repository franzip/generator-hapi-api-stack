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

describe('generator-hapi-api-stack:job', () => {

  const prompts = {
    jobName: 'some very long and stupid-name',
    jobType: 'manual'
  };

  const filename = _.kebabCase(prompts.jobName);
  const jobName = _.camelCase(prompts.jobName);
  const tmpFolder = path.join(process.cwd(), './temp');
  const prefixTemp = (filename) => path.join(tmpFolder, filename);

  const expected = prefixTemp(`jobs/${filename}.js`);

  before((done) => {
    helpers.run(path.join(__dirname, '../generators/job'))
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

  it('fills the job file with correct information', (done) => {

    const regex = new RegExp(`\.jobs\.${jobName}\.NAME[\\s\\S]*\.jobs\.${jobName}\.CONFIG`);

    assert.fileContent(expected, regex);

    done();
  });
});
