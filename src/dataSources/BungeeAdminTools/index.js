const Sequelize = require('sequelize');

module.exports = class BungeeAdminTools {
  constructor({ db } = {}) {
    const {
      host, database, user, password,
    } = db;
    this.sequelize = new Sequelize(database, user, password, {
      host,
      dialect: 'mysql',
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
    });
    this.models = {
      player: this.sequelize.import(`${__dirname}/models/player`),
      ban: this.sequelize.import(`${__dirname}/models/ban`),
      mute: this.sequelize.import(`${__dirname}/models/mute`),
      kick: this.sequelize.import(`${__dirname}/models/kick`),
      warn: this.sequelize.import(`${__dirname}/models/warn`),
    };

    Object.values(this.models).forEach((model) => model.associate(this.models));
  }

  testConnection() {
    return this.sequelize.authenticate();
  }
};
