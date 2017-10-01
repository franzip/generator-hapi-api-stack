'use strict';

const Generator = require('yeoman-generator');
const chalk = require('chalk');
const _ = require('lodash');
const jsonEscape = require('../utils/').jsonEscape;

let config;

module.exports = Generator.extend({
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
      config = {
        jobName: _.camelCase(jsonEscape(props.jobName)),
        jobType: jsonEscape(props.jobType)
      };
    });
  },

  writing: {
    job: function() {
      this.fs.copyTpl(
        this.templatePath(config.jobType),
        this.destinationPath('jobs', _.kebabCase(config.jobName) + '.js'),
        config
      );
    }
  },

  end: function() {
    const runtimeConfig = `/runtime/jobs.js`;
    const reminder = `Don't forget to add a '${config.jobName}' property into ${runtimeConfig} file to set up your job!`;
    this.log('\n');
    this.log(chalk.bgYellow.white(reminder));
  }
});
