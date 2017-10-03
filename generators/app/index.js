'use strict';

const Generator = require('yeoman-generator');
const fs = require('fs');
const chalk = require('chalk');
const yosay = require('yosay');
const npmWhoami = require('npm-whoami');
const hasbin = require('hasbin');
const path = require('path');
const file = require('file');
const _ = require('lodash');
const jsonEscape = require('../../utils/').jsonEscape;

let config;

module.exports = class extends Generator {
  initializing() {
    this.pkg = require('../../package.json');
    this.dirname = path.basename(this.destinationRoot());
  }

  prompting() {
    this.log(yosay(
      'Welcome to the ' + chalk.red('Hapi API Generator') + ' generator!'
    ));

    this.username = '';

    if (!this.options['skip-whoami']) {
      try {
        this.username = npmWhoami.sync();
      } catch(e) {
        console.warn('Error getting npm user name: run `npm login`');
      }
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
      let apiPrefix = jsonEscape(props.apiPrefix);
      apiPrefix = apiPrefix === '/' ? '' : apiPrefix;

      const repo = jsonEscape(props.repo);

      config = {
        user: jsonEscape(props.user),
        repo: repo,
        kebabRepoName: _.kebabCase(repo),
        description: jsonEscape(props.description),
        author: jsonEscape(props.author),
        projectName: _.camelCase(jsonEscape(props.repo)),
        dbName: jsonEscape(props.dbName),
        dbConnectionName: _.camelCase(props.dbName),
        apiPrefix: apiPrefix
      };
    });
  }

  writing() {
    const src = this.sourceRoot();
    file.walkSync(src, (dirPath, dirs, files) => {
      const relativeDir = path.relative(src, dirPath);
      files.forEach((filename) => {
        this.fs.copyTpl(
          this.templatePath(relativeDir, filename),
          this.destinationPath(relativeDir, filename),
          config
        );
      });
    });
  }

  install() {
    this.spawnCommandSync('git', ['init', '-q']);
    this.log(`\n\n\nInitialized empty Git repository in ${this.destinationRoot()}`);

    const hasYarn = hasbin.sync('yarn');

    this.installDependencies({
      bower: false,
      npm: !hasYarn,
      yarn: hasYarn ? { force: true } : false ,
      skipInstall: this.options['skip-install']
    });
  }

  end() {
    fs.existsSync('./.yo-rc.json') && fs.unlinkSync('./.yo-rc.json');
  }
}
