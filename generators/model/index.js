'use strict';

const Generator = require('yeoman-generator');
const _ = require('lodash');
const jsonEscape = require('../../utils/').jsonEscape;

let config;

module.exports = class extends Generator {
  prompting() {
    const prompts = [
      {
        type: 'input',
        name: 'modelName',
        message: 'How do you want to call this model?',
        default: 'model'
      },
      {
        type: 'input',
        name: 'dbConnectionName',
        message: 'Which ORM database connection should be used? (specify by name)',
        default: 'myApi'
      }
    ];

    return this.prompt(prompts).then((props) => {
      config = {
        modelName: _.kebabCase(jsonEscape(props.modelName)),
        dbConnectionName: jsonEscape(props.dbConnectionName)
      };
    });
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('template'),
      this.destinationPath('models', config.modelName + '.js'),
      config
    );
  }
}
