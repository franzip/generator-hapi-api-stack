'use strict';

const Generator = require('yeoman-generator');
const _ = require('lodash');
const jsonEscape = require('../../utils/').jsonEscape;

let config;

module.exports = Generator.extend({
  prompting: function() {
    const prompts = [
      {
        type: 'input',
        name: 'serviceName',
        message: 'How do you want to call this service?',
        default: 'service'
      }
    ];

    return this.prompt(prompts).then((props) => {
      config = {
        serviceName: _.camelCase(jsonEscape(props.serviceName))
      };
    });
  },

  writing: {
    service: function() {
      this.fs.copyTpl(
        this.templatePath('template'),
        this.destinationPath('services', _.kebabCase(config.serviceName) + '.js'),
        config
      );
    }
  }
});
