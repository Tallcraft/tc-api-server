const Sequelize = require('sequelize');
const config = require('../../config');

const userPermissions = require('./models/luckperms_user_permissions');

const {
  host, database, user, password,
} = config.get('connectors.luckPerms.db');

const db = new Sequelize(database, user, password, {
  host,
  dialect: 'mysql',
});

const models = {
  playerPermissions: userPermissions(db, Sequelize.DataTypes),
};

const luckPermsConnector = {
  models,
  db,
  testConnection() {
    return db.authenticate();
  },
};

module.exports = { luckPermsConnector };
