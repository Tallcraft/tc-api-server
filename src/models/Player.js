const { bungeeAdminToolsConnector } = require('../connectors');

class Player {
  static all(limit, offset) {
    return null; //TODO
  }

  static getByUUID(uuid) {
    return bungeeAdminToolsConnector.models.player.findByPk(uuid.replace('-', ''));
  }
}

module.exports = { Player };
