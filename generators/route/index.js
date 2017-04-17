'use strict';

const Generator = require('yeoman-generator');
const chalk = require('chalk');
const path = require('path');
const _ = require('lodash');
const jsonEscape = require('../../utils/').jsonEscape;

let config;

module.exports = Generator.extend({
  prompting: function() {
    const prompts = [
      {
        type: 'input',
        name: 'routeName',
        message: 'How do you want to call this route?',
        default: 'route'
      },
      {
        type: 'confirm',
        name: 'hasTest',
        message: 'Do you want to create a test file for this route?',
        default: true
      }
    ];

    return this.prompt(prompts).then((props) => {
      config = {
        routeName: _.camelCase(jsonEscape(props.routeName)),
        hasTest: props.hasTest
      };
    });
  },

  writing: {
    route: function() {
      const filename = _.kebabCase(config.routeName) + '.js';
      const routeFolder = 'routes';
      const testFolder = 'test';
      const folders = ['config', 'handlers', 'validations'];
      const outputs = folders
        .map((folder) => {
          return {
            template: `${folder}_template`,
            target: path.join(routeFolder, folder, filename)
          }
        });

      if (config.hasTest) {
        outputs.push({ template: 'test_template', target: path.join(testFolder, filename) });
      }

      this.fs.copyTpl(
        this.templatePath('route_template'),
        this.destinationPath(routeFolder, filename),
        config
      );

      _.each(outputs, (output) => {
        this.fs.copyTpl(
          this.templatePath(output.template),
          this.destinationPath(output.target),
          config
        )
      });
    }
  },

  end: function() {
    const runtimeConfig = `/runtime/routes.js`;
    const reminder = `You can add runtime configuration for the route you have just created in '${runtimeConfig}'`;
    this.log('\n');
    this.log(chalk.bgYellow.white(reminder));
  }
});
