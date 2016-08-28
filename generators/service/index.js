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
        name: 'serviceName',
        message: 'How do you want to call this service?',
        default: 'service'
      }
    ];

    return this.prompt(prompts).then((props) => {
      this.serviceName = _.camelCase(jsonEscape(props.serviceName));
    });
  },

  writing: {
    service: function() {
      const output = path.join('services', _.kebabCase(this.serviceName) + '.js');
      this.template('template', output);
    }
  }
});
