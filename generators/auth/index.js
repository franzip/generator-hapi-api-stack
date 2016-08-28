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
      this.strategyName = jsonEscape(props.strategyName);
      this.pluginName = jsonEscape(props.pluginName);
    });
  },

  writing: {
    auth: function() {
      const output = path.join('auth', _.kebabCase(this.strategyName) + '.js');
      this.template('template', output);
    }
  }
});
