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

describe('generator-hapi-api-stack:route', () => {

  const prompts = {
    routeName: 'my awesome route',
    hasTest: true
  };

  const tmpFolder = path.join(process.cwd(), './temp');
  const prefixTemp = (filename) => path.join(tmpFolder, filename);
  const fileName = _.kebabCase(prompts.routeName) + '.js';
  const routeName = _.camelCase(prompts.routeName);

  const expected = _([
    `routes/${fileName}`,
    `routes/config/${fileName}`,
    `routes/handlers/${fileName}`,
    `routes/validations/${fileName}`,
    `test/${fileName}`
  ])
  .map(prefixTemp)
  .value();

  before((done) => {
    helpers.run(path.join(__dirname, '../generators/route'))
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

  it('fills route files with correct information', (done) => {
    let regex;
    let file;

    file = expected[0];
    regex = new RegExp(`\.\/config\/${routeName}`);

    assert.fileContent(file, regex);

    file = expected[1];
    regex = new RegExp(`'\.\.\/validations\/${routeName}'[\\s\\S]*\.\.\/handlers\/${routeName}`);

    assert.fileContent(file, regex);

    file = expected[3];
    regex = new RegExp(`.${routeName};`);

    file = expected[4];
    regex = new RegExp(`describe\\('${routeName}'[\\s\\S]*url: '\/${routeName}'`);

    done();
  });
});
