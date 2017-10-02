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
        name: 'strategyName',
        message: 'How do you want to call this authentication strategy?',
        default: 'authStrategy'
      },
      {
        type: 'input',
        name: 'pluginName',
        message: 'Which Hapi authentication plugin do you want to use?',
        default: 'bearer-access-token'
      }
    ];

    return this.prompt(prompts).then((props) => {
      config = {
        strategyName: jsonEscape(props.strategyName),
        pluginName: jsonEscape(props.pluginName)
      }
    });
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('template'),
      this.destinationPath('auth', _.kebabCase(config.strategyName) + '.js'),
      config
    );
  }
}
