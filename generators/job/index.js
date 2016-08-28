'use strict';

const yeoman = require('yeoman-generator');
const jsesc = require('jsesc');
const path = require('path');
const chalk = require('chalk');
const _ = require('lodash');

function jsonEscape(str) {
  return jsesc(str, {quotes: 'double'});
}

module.exports = yeoman.Base.extend({
  prompting: function() {
    const prompts = [
      {
        type: 'input',
        name: 'jobName',
        message: 'How do you want to call this job?',
        default: 'job'
      },
      {
        type: 'list',
        name: 'jobType',
        message: 'Which kind of job do you want to create?',
        choices: ['manual', 'recurring'],
        default: 'manual'
      }
    ];

    return this.prompt(prompts).then((props) => {
      this.jobName = _.camelCase(jsonEscape(props.jobName));
      this.jobType = jsonEscape(props.jobType);
    });
  },

  writing: {
    job: function() {
      const output = path.join('jobs', _.kebabCase(this.jobName) + '.js');
      this.template(this.jobType, output);
    }
  },

  end: function() {
    const runtimeConfig = `/runtime/jobs.js`;
    const reminder = `Don\'t forget to add a '${this.jobName}' property into ${runtimeConfig} file to set up your job!`;
    this.log('\n');
    this.log(chalk.bgYellow.white(reminder));
  }
});
