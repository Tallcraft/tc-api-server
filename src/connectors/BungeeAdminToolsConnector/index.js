const Sequelize = require('sequelize');
const config = require('../../config');

const modelConstructors = require('./models');

const {
  host, database, user, password,
} = config.get('connectors.bungeeAdminTools.db');

const db = new Sequelize(database, user, password, {
  host,
  dialect: 'mysql',
});

// Initialize models
const models = {};
Object.keys(modelConstructors)
  .forEach((key) => {
    models[key] = modelConstructors[key](db, Sequelize.DataTypes);
  });

// Establish associations between models
Object.values(models).forEach((model) => model.associate(models));

const bungeeAdminToolsConnector = {
  models,
  db,
  testConnection() {
    return db.authenticate();
  },
};

module.exports = { bungeeAdminToolsConnector };
