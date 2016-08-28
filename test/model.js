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

describe('generator-hapi-api-stack:model', () => {

  const prompts = {
    modelName: 'my awesome model',
    dbConnectionName: 'my-db'
  };

  const modelName = _.kebabCase(prompts.modelName);
  const tmpFolder = path.join(process.cwd(), './temp');
  const prefixTemp = (filename) => path.join(tmpFolder, filename);
  const filename = _.kebabCase(prompts.modelName) + '.js';

  const expected = prefixTemp(`models/${filename}`);

  before((done) => {
    helpers.run(path.join(__dirname, '../generators/model'))
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

  it('fills the model file with correct information', (done) => {
    const regex = new RegExp(`identity: '${modelName}'[\\s\\S]*tableName: '${modelName}'[\\s\\S]*connection: '${prompts.dbConnectionName}'`);

    assert.fileContent(expected, regex);

    done();
  });
});
