const { bungeeAdminToolsConnector } = require('../connectors');

class Player {
  static getPlayerList({ limit, offset, order}) {
    return bungeeAdminToolsConnector.models.player.findAll({
      offset,
      limit,
      order: [['firstLogin', order]],
    });
  }

  static getByUUID(uuid) {
    return bungeeAdminToolsConnector.models.player.findByPk(uuid.replace('-', ''));
  }
}

module.exports = { Player };
