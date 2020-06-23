const Sequelize = require('sequelize');
const config = require('../../config');

const {
  host, database, user, password,
} = config.get('connectors.luckPerms.db');

const db = new Sequelize(database, user, password, {
  host,
  dialect: 'mysql',
});

// TODO: Initialize models
const models = {};

// Establish associations between models
Object.values(models).forEach((model) => model.associate(models));

const luckPermsConnector = {
  models,
  db,
  Sequelize,
  testConnection() {
    return db.authenticate();
  },
};

module.exports = { luckPermsConnector };
