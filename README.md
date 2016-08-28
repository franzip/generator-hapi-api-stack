# generator-hapi-api-stack
[![NPM version](https://badge.fury.io/js/generator-hapi-api-stack.svg)](https://npmjs.org/package/generator-hapi-api-stack)
[![Build Status](https://travis-ci.org/franzip/generator-hapi-api-stack.svg?branch=master)](https://travis-ci.org/franzip/generator-hapi-api-stack)
[![Dependency Status](https://david-dm.org/franzip/generator-hapi-api-stack.svg)](https://david-dm.org/franzip/generator-hapi-api-stack)
[![DevDependency Status](https://david-dm.org/franzip/generator-hapi-api-stack/dev-status.svg)](https://david-dm.org/franzip/generator-hapi-api-stack?type=dev)

An Hapi API generator with ORM, services, job queue, authentication, caching and deployment out of the box.

Table of Contents
=================

  * [generator\-hapi\-api\-stack](#generator-hapi-api-stack)
  * [Table of Contents](#table-of-contents)
    * [Installation](#installation)
    * [Project Generator](#project-generator)
    * [Project Structure](#project-structure)
      * [auth](#auth)
        * [Adding a new auth strategy](#adding-a-new-auth-strategy)
      * [config](#config)
        * [Adding a new environment](#adding-a-new-environment)
        * [Adding a cache provider](#adding-a-cache-provider)
        * [Adding a database connection](#adding-a-database-connection)
        * [API route prefix](#api-route-prefix)
      * [db](#db)
      * [jobs](#jobs)
        * [Job types](#job-types)
        * [Adding a new job](#adding-a-new-job)
      * [lib](#lib)
      * [methods](#methods)
      * [models](#models)
        * [Adding a new model](#adding-a-new-model)
      * [routes](#routes)
        * [Adding a new route](#adding-a-new-route)
      * [runtime](#runtime)
      * [services](#services)
        * [Adding a new service](#adding-a-new-service)
    * [Testing](#testing)
    * [Deployment](#deployment)
      * [shipitfile\.js](#shipitfilejs)
      * [process\.json](#processjson)
    * [Generators](#generators)
      * [Auth Generator](#auth-generator)
      * [Job Generator](#job-generator)
      * [Model Generator](#model-generator)
      * [Route Generator](#route-generator)
      * [Service Generator](#service-generator)
    * [License](#license)

## Installation

```bash
npm install -g yo
npm install -g generator-hapi-api-stack
```

## Project Generator

Navigate to the directory you'd like to use for your project, then run:
```bash
yo hapi-api-stack
```

You will be asked a few questions to bootstrap your project.

## Project Structure

```bash
.
├── auth
│   ├── index.js
│   └── ... // strategies
├── config
│   ├── dev.js
│   ├── staging.js
│   ├── prod.js
│   └── test.js
├── db
│   ├── index.js
│   └── indexes.js
├── jobs
│   ├── index.js
│   └── ... // jobs
├── lib
│   ├── index.js
│   └── shutdown.js
├── methods
│   ├── index.js
│   └── ... // methods
├── models
│   ├── index.js
│   └── ... // models
├── routes
│   ├── config
│   ├── handlers
│   ├── validations
│   ├── index.js
│   └── ... // routes
├── runtime
│   ├── index.js
│   ├── cache.js
│   ├── jobs.js
│   └── routes.js
├── services
│   ├── index.js
│   └── ... // services
├── test
├── server.js
├── config.js
├── shipitfile.js
├── process.json
└── README.md
```

### auth
The `auth` folder exports a plugin that registers all defined authentication strategies.

#### Adding a new auth strategy
Use the [Auth Generator](#auth-generator) or do it manually by creating a file in the `auth` folder

### config
The `config` folder holds environment specific configuration that will be loaded at server startup: you can later access the config object for the chosen environment by either referencing `server.settings.app` (if you have `server` in scope) or by requiring `config.js` directly.

#### Adding a new environment
Create a `config/envName.js` file:

``` 
// config/envName.js
module.exports = {
    env: 'envName', // must match filename
    // ...
};
```

Add the environment in `config.js`: 

``` 
// config.js
const env = require('get-env')({
  staging: 'staging',
  test: 'test',
  envName: 'envName'
});
```

Check out [node-get-env](https://github.com/pilwon/node-get-env) if you need further customization.

#### Adding a cache provider

You can set up and use multiple cache providers:
``` 
// config/envName.js
module.exports = {
    ...
    cache: {
        cacheName: {
          engine: 'catbox-redis',
          name: 'cacheName',
          host: '0.0.0.0',
          port: 6379,
          partition: 'my-api'
        },
        someOtherCache: { ... }
    },
    // ...
};
```
Where `cacheName` and `someOtherCache` must be valid [Catbox client objects](https://github.com/hapijs/catbox#client).  
You can then access `cacheName` by either referencing `server.settings.app.cache.cacheName` (if you have `server` in scope) or by directly requiring `config.js`.  
If you want to disable caching for a specific environment, remove the `cache` property or set it to a falsy value.

#### Adding a database connection
With [Waterline](https://github.com/balderdashy/waterline-docs/blob/master/introduction/getting-started.md) you can have multiple database connections, just make sure you are requiring all the adapters you are using:
``` 
// config/envName.js
module.exports = {
    ...
    dogwater: {
        connections: {
            mysqlConnection: {
                adapter: 'sails-mysql',
                host: 'localhost',
                port: 3306,
                user: 'user',
                password: 'password',
                database: 'mydb'
            },
            mongoConnection: {
                adapter: 'sails-mongo',
                host: 'localhost',
                port: 27017,
                database: 'mydb'
            }
        },
        adapters: {
          'sails-mysql': require('sails-mysql'),
          'sails-mongo': require('sails-mongo')
        }
    }
};
``` 

#### API route prefix
You can prefix all your routes:
``` 
module.exports = {
    ...
    apiPrefix: '/api/v1',
    // apiPrefix: '' <- no prefix
};
``` 

### db
The `db` folder exports a plugin that perform database related initialization.  
The template you'll get with the generator has a `db/indexes.js` file where you can set up database indexes.
``` 
// db/indexes.js
module.exports = {
    // modelName must be an existing Waterline model
    modelName: [  
        // indexes ...
    ]
};
``` 
### jobs

The `jobs` folder exports a plugin that does three things: 

- Registers all jobs in the `jobs` folder
- Starts all recurring jobs
- Expose the [Agenda](https://github.com/rschmukler/agenda) instance on the server so that you can later reference `server.jobs`

If you want to disable jobs for a specific environment, remove the `jobs` property in `config/envname.js` or set it to a falsy value.

#### Job types

There are basically two types of job you can set up:

- Manual: you define it, and then its execution must be triggered manually
- Recurring: you define it, and it will keep running as long as the server is up

#### Adding a new job
Use the [Job Generator](#job-generator) or do it manually by creating a file in the `jobs` folder

### lib
The `lib` folder registers all the plugins, so if you want to take something out or load more plugins just modify `lib/index.js` as you see fit.  
Server shutdown cleanup is in `lib/shutdown.js`

### methods

The `methods` folder exports a plugin that registers [server methods](https://github.com/hapijs/hapi/blob/master/API.md#servermethodname-method-options).

### models

The `models` folder contains all the [Waterline models](https://github.com/balderdashy/waterline-docs/blob/master/models/models.md) to be loaded through the [Dogwater plugin](https://github.com/devinivy/dogwater)

#### Adding a new model
Use the [Model Generator](#model-generator) or do it manually by creating a file in the `models` folder

### routes

The `routes` folder exports a plugin that registers routes on the server.  
The following convention is used:  
`routes/domain.js` exports an array of [route configuration objects](https://github.com/hapijs/hapi/blob/master/API.md#route-configuration)  
`routes/config/domain.js` is where each route gets its [specific options](https://github.com/hapijs/hapi/blob/master/API.md#route-options)   
`routes/handlers/domain.js` exports the [route handlers](https://github.com/hapijs/hapi/blob/master/API.md#route-handler) used in the config file  
`routes/validations/domain.js` exports the validation objects used in the config file

#### Adding a new route
Use the [Route Generator](#route-generator) or do it manually by creating a file in the `routes` folder

TODO Link to routes generator

### runtime
The `runtime` folder exports a plugin that registers runtime configuration objects under `server.plugins.runtime`.  
The exported content of `runtime/filename.js` will be available under `server.plugins.runtime.filename`.  

`runtime/cache.js` holds [server cache options](https://github.com/hapijs/hapi/blob/master/API.md#servercacheoptions)  
`runtime/routes.js` holds routes domain-specific options  
`runtime/jobs.js` holds [Agenda jobs options](https://github.com/rschmukler/agenda#definejobname-options-fn)  
You can add as many runtime config files as you want and they will be automatically loaded at startup.

### services

The `services` folder exports a plugin that registers [Seneca](https://github.com/senecajs/seneca) services through the [Chairo plugin](https://github.com/hapijs/chairo)

#### Adding a new service

Use the [Service Generator](#service-generator) or do it manually by creating a file in the `services` folder

## Testing

The template project uses the [Labbable](https://github.com/devinivy/labbable) plugin for testing purposes.  
This will get you a fully initialized server ready to be tested.

## Deployment

### shipitfile.js

The template you will get comes with a `shipitfile.js`: check out the [Shipit project](https://github.com/shipitjs/shipit) to understand how to customize for your own needs.  

### process.json

[pm2 docs](http://pm2.keymetrics.io/docs/usage/quick-start/)

## Generators
### Auth Generator

From the root of your project, run: 
```
yo hapi-api-stack:auth
```

It will create a new file, with the name you specified, in `/auth`.

### Job Generator

From the root of your project, run: 
```
yo hapi-api-stack:job
```

It will create a new file, with the name you specified, in `/jobs`.  
Don't forget to add the newly created job configuration in `runtime/jobs.js`.  
Each job should have: `NAME`, `TYPE` and an optional `CONFIG` property.  
Recurring jobs require, in addition, a `FREQUENCY` property.  
Refer to `runtime/jobs.js` template file to check how to set up a job.

### Model Generator

From the root of your project, run: 
```
yo hapi-api-stack:model
```

It will create a new file, with the name you specified, in `/models`.  
Please note that the ORM database connection to use for the model should exist or you'll get an error on server startup.

### Route Generator

From the root of your project, run: 
```
yo hapi-api-stack:route
```

It will create four files with the name you specified in `/routes`, `/routes/config`, `/routes/handlers`, `/routes/validations` and, if specified, a file in `/test`.  

### Service Generator

From the root of your project, run: 
```
yo hapi-api-stack:service
```

It will create a new file, with the name you specified, in `/services`. 

## License

[MIT](http://opensource.org/licenses/MIT/ "MIT") Public License.
