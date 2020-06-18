const Sequelize = require('sequelize');
const config = require('../../config');

const {
  host, database, user, password,
} = config.get('connectors.bungeeAdminTools.db');

const db = new Sequelize(database, user, password, {
  host,
  dialect: 'mysql',
});

// Initialize models
const models = {
  player: db.import(`${__dirname}/models/player`),
  ban: db.import(`${__dirname}/models/ban`),
  mute: db.import(`${__dirname}/models/mute`),
  kick: db.import(`${__dirname}/models/kick`),
  warn: db.import(`${__dirname}/models/warn`),
};

// Establish associations between models
Object.values(models).forEach((model) => model.associate(models));

const bungeeAdminToolsConnector = {
  models,
  db,
  Sequelize,
  testConnection() {
    return db.authenticate();
  },
};

module.exports = { bungeeAdminToolsConnector };
