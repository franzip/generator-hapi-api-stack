'use strict';

const yeoman = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const npmWhoami = require('npm-whoami');
const jsesc = require('jsesc');
const path = require('path');
const file = require('file');
const _ = require('lodash');

function jsonEscape(str) {
  return jsesc(str, {quotes: 'double'});
}

module.exports = yeoman.Base.extend({
  initializing: function() {
    this.pkg = require('../../package.json');
    this.dirname = path.basename(this.destinationRoot());
  },

  prompting: function() {
    this.log(yosay(
      'Welcome to the ' + chalk.red('Hapi API Generator') + ' generator!'
    ));

    this.username = '';
    try {
      this.username = npmWhoami.sync();
    } catch(e) {
      console.warn('Error getting npm user name: run `npm login`');
    }

    const gitName = this.user.git.name();
    const gitEmail = this.user.git.email();
    let defaultAuthor = gitName ? gitName : '';
    if (gitEmail) {
      defaultAuthor += ` <${gitEmail}>`;
    }

    const prompts = [
      {
        type: 'input',
        name: 'user',
        message: 'What is the username/organization for this project?',
        default: this.username,
        store: true
      },
      {
        type: 'input',
        name: 'repo',
        message: 'What is the repository/project name?',
        default: this.dirname
      },
      {
        type: 'input',
        name: 'description',
        message: 'What is a description for this project?',
        default: 'My awesome API'
      },
      {
        type: 'input',
        name: 'author',
        message: 'Who is the author of this project?',
        default: defaultAuthor,
        store: true
      },
      {
        type: 'input',
        name: 'apiPrefix',
        message: 'How do you want to prefix your API endpoint? (Type \'/\' for no prefix)',
        default: '/api/v1'
      },
      {
        type: 'input',
        name: 'dbName',
        message: 'How do you want to call the database for this project?',
        default: 'my-api'
      }
    ];

    return this.prompt(prompts).then((props) => {
      this.user = jsonEscape(props.user);
      this.repo = jsonEscape(props.repo);
      this.kebabRepoName = _.kebabCase(this.repo);
      this.description = jsonEscape(props.description);
      this.author = jsonEscape(props.author);
      this.projectName = _.camelCase(jsonEscape(props.repo));
      this.dbName = jsonEscape(props.dbName);
      this.dbConnectionName = _.camelCase(this.dbName);

      const apiPrefix = jsonEscape(props.apiPrefix);
      this.apiPrefix = apiPrefix === '/' ? '' : apiPrefix;
    });
  },

  writing: {
    app: function() {
      const src = this.sourceRoot();
      file.walkSync(src, (dirPath, dirs, files) => {
        const relativeDir = path.relative(src, dirPath);
        files.forEach((filename) => {
          const target = path.join(relativeDir, filename);
          this.template(target, target);
        });
      });
    }
  },

  install: function() {
    this.installDependencies({
      bower: false,
      npm: true,
      skipInstall: this.options['skip-install']
    });
  }
});
