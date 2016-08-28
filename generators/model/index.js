'use strict';

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
      this.modelName = _.kebabCase(jsonEscape(props.modelName));
      this.dbConnectionName = jsonEscape(props.dbConnectionName);
    });
  },

  writing: {
    model: function() {
      const output = path.join('models', this.modelName + '.js');
      this.template('template', output);
    }
  }
});
