'use strict';

const chalk = require('chalk');
const yeoman = require('yeoman-generator');
const jsesc = require('jsesc');
const path = require('path');
const _ = require('lodash');

function jsonEscape(str) {
  return jsesc(str, {quotes: 'double'});
}

module.exports = yeoman.Base.extend({
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
      this.routeName = _.camelCase(jsonEscape(props.routeName));
      this.hasTest = props.hasTest;
    });
  },

  writing: {
    route: function() {
      const filename = _.kebabCase(this.routeName) + '.js';
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

      if (this.hasTest) {
        outputs.push({ template: 'test_template', target: path.join(testFolder, filename) });
      }

      this.template('route_template', path.join(routeFolder, filename));
      _.each(outputs, (output) => this.template(output.template, output.target));
    }
  },

  end: function() {
    const runtimeConfig = `/runtime/routes.js`;
    const reminder = `You can add runtime configuration for the route you have just created in '${runtimeConfig}'`;
    this.log('\n');
    this.log(chalk.bgYellow.white(reminder));
  }
});
