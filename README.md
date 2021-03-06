# Koseq
A simple CRUD app that uses Koa and Sequalize to interact with a sql databases.

This has no safety measures build in, so it is not' recommended for anything in production currently.

## Usage example
```
const ORM = require('koa-orm');
const fs = require('fs');
const { join } = require('path');
const APIServer = require('vargr/api-server');
const addAllActions = require('vargr/koa/actions/CRUD/all');

// See the sequalize docs for more information on what can be configured
const dbConfig = {
  name: 'demo',
  modelPath: join(__dirname, '../models'), // Path to folder where model definitions can be found
  db: 'mydatabase',
  username: 'myusername',
  password: 'mypassword',
  dialect: 'mysql',
  host: 'localhost',
  port: 3306,
  pool: {
    maxConnections: 10,
    minConnections: 0,
    maxIdleTime: 30000
  },
  logging: false
};

APIServer({
  // Posts/Comments is reference to the model file name being 'posts' and 'comments' small case.
  routerHook: async function(router) {
    addAllActions(router, 'Posts');
    addAllActions(router, 'Comments');
  },
  database: dbConfig,
  port: 8080,
  httpsPort: 8082,
  keyOptions: {
    key: fs.readFileSync('server.key'),
    cert:  fs.readFileSync('server.crt')
  }
});
```

## Model definition example
This is basically just a method that get's the sequalize instance and returns a model definition.
Refer to the sequalize docs for more information on this.
```
const Sequelize = require('sequelize');

module.exports = function(sequelize) {
  let model = sequelize.define('Messages', {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV1,
      primaryKey: true
    },
    content: { type: Sequelize.TEXT() },
    type: { type: Sequelize.STRING(128) },
    created: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    },
  }, {
    tableName: 'posts',
    timestamps: false,
    underscored: true
  });

  model.beforeValidate((row, options) => {
    if (!row.created) {
      row.created = new Date();
    }
  });

  return model;
};
```
