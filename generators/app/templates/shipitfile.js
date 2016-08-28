'use strict';

module.exports = (shipit) => {

  require('shipit-deploy')(shipit);

  const staging = require('./config/staging').deploy;
  const production = require('./config/prod').deploy;
  const pathStr = 'PATH=\'$PATH:/usr/local/bin\'';
  const selectedEnvironment = shipit.environment;
  const deployPath = selectedEnvironment === 'staging' ? staging.deployTo : production.deployTo;
  const currentPath = `${deployPath}/current`;

  shipit.initConfig({
    default: {
      workspace: '/tmp/<%= projectName %>',
      deployTo: '/home/<%= user %>/<%= projectName %>',
      repositoryUrl: 'https://github.com/<%= user %>/<%= repo %>.git',
      ignores: ['.git', 'node_modules', '.editorconfig', '.eslintignore', '.eslintrc', '.gitignore', 'LICENSE', 'README.md', 'test'],
      rsync: ['--del'],
      keepReleases: 2,
      key: '~/.ssh/id_rsa.pem',
      shallowClone: true,
      deleteOnRollback: false
    },
    staging,
    production
  });

  shipit.on('init', () => {

    shipit.log('Starting deployment on environment: %s', selectedEnvironment);
  });

  shipit.on('deployed', () => {

    shipit.log('Deployment completed... Starting tasks:');
    shipit.start('install_deps', 'copy_pm2_config', 'restart_pm2');
  });

  shipit.blTask('install_deps', () => {

    shipit.log('Running npm install...');
    return shipit.remote(`cd ${currentPath} && npm install --production &> /dev/null`);
  });

  shipit.blTask('copy_pm2_config', () => {

    shipit.log('Copying pm2 config file...');
    shipit.remoteCopy('process.json', deployPath);
  });

  shipit.blTask('restart_pm2', () => {

    shipit.log('Restarting pm2...');
    return shipit.remote(`${pathStr} && cd ${deployPath} && pm2 reload process.json --env ${selectedEnvironment}`);
  });
};
