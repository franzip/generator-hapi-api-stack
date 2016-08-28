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

describe('generator-hapi-api-stack:app', () => {

  const prompts = {
    user: 'franzip',
    repo: 'cool-project',
    description: 'My awesome API',
    author: 'franzip',
    dbName: 'my-api',
    apiPrefix: '/api/v1'
  };

  const projectName = _.camelCase(prompts.repo);
  const tmpFolder = path.join(process.cwd(), './temp');
  const prefixTemp = (filename) => path.join(tmpFolder, filename);

  before((done) => {
    helpers.run(path.join(__dirname, '../generators/app'))
      .inDir(tmpFolder)
      .withPrompts(prompts)
      .withOptions({ 'skip-install': true })
      .on('end', done);
  });

  after((done) => {
    rimraf(tmpFolder, done);
  });

  it('creates files', (done) => {
    const expected = _([
      '.editorconfig',
      '.eslintignore',
      '.eslintrc',
      '.gitignore',
      '.travis.yml',
      'config.js',
      'LICENSE',
      'package.json',
      'process.json',
      'README.md',
      'server.js',
      'shipitfile.js',
      'config/dev.js',
      'config/prod.js',
      'config/staging.js',
      'config/test.js',
      'db/index.js',
      'jobs/index.js',
      'lib/index.js',
      'methods/index.js',
      'routes/index.js',
      'routes/config',
      'routes/handlers',
      'routes/validations',
      'runtime/index.js',
      'services/index.js',
      'test/index.js',
    ])
    .map(prefixTemp)
    .value();

    assert.file(expected);

    done();
  });

  it('fills package.json with correct information', (done) => {
    assert.JSONFileContent(prefixTemp('package.json'), {
      name: prompts.repo,
      description: prompts.description,
      author: prompts.author
    });
    done();
  });

  it('fills environment config files with correct information', (done) => {
    let expected;
    const dbConnectionName = _.camelCase(prompts.dbName);
    const regex = new RegExp(`name: '${projectName}'[\\s\\S]*${projectName}[\\s\\S]*${dbConnectionName}: {[\\s\\S]*database: '${prompts.dbName}'[\\s\\S]*\/${prompts.dbName}'[\\s\\S]*apiPrefix: '${prompts.apiPrefix}'`);
    const testRegex = new RegExp(`name: '${projectName}'[\\s\\S]*${projectName}[\\s\\S]*${dbConnectionName}: {[\\s\\S]*database: 'test'[\\s\\S]*\/test[\\s\\S]*apiPrefix: '${prompts.apiPrefix}'`);

    expected = _([
      'config/dev.js',
      'config/staging.js',
      'config/prod.js'
    ])
    .map(prefixTemp)
    .map((filePath) => [ filePath, regex ])
    .value();

    assert.fileContent(expected);

    expected = _([
      'config/test.js'
    ])
    .map(prefixTemp)
    .map((filePath) => [ filePath, testRegex ])
    .value();

    assert.fileContent(expected);

    done();
  });

  it('fills server.js with correct information', (done) => {
    const expected = prefixTemp('server.js');

    assert.fileContent(expected, `const ServerConfig = Config.server.${projectName};`);

    done();
  })

  it('fills shipitfile.js correct information', (done) => {
    const expected = prefixTemp('shipitfile.js');
    const workspace = `: '/tmp/${projectName}'`;
    const deployTo = `: '/home/${prompts.user}/${projectName}'`;
    const repositoryUrl = `: 'https://github.com/${prompts.user}/${prompts.repo}.git'`
    const regex = new RegExp(`${workspace}[\\s\\S]*${deployTo}[\\s\\S]*${repositoryUrl}`);

    assert.fileContent(expected, regex);

    done();
  });
});
