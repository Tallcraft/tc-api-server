const Sequelize = require('sequelize');
const config = require('../../config');

const {
  host, database, user, password,
} = config.get('connectors.luckPerms.db');

const db = new Sequelize(database, user, password, {
  host,
  dialect: 'mysql',
});

const models = {
  playerPermissions: db.import(`${__dirname}/models/luckperms_user_permissions`),
};

const luckPermsConnector = {
  models,
  db,
  testConnection() {
    return db.authenticate();
  },
};

module.exports = { luckPermsConnector };
