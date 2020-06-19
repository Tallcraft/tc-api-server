const { bungeeAdminToolsConnector } = require('../connectors');

const { Sequelize } = bungeeAdminToolsConnector;

class Player {
  static getPlayerList({
    limit, offset, order, searchPlayerName,
  }) {
    const options = {
      offset,
      limit,
      order: [['firstLogin', order]],
    };

    if (searchPlayerName) {
      options.where = {
        lastSeenName: Sequelize.where(
          Sequelize.fn('LOWER',
            Sequelize.col('BAT_player')), 'LIKE', searchPlayerName,
        ),
      };
    }
    return bungeeAdminToolsConnector.models.player.findAll(options);
  }

  static getByUUID(uuid) {
    const cleanUUID = Player.cleanupUUID(uuid);
    if (!cleanUUID) {
      return null;
    }
    return bungeeAdminToolsConnector.models.player.findByPk(cleanUUID);
  }

  static cleanupUUID(uuid) {
    // Filter undefined and 0 uuids
    if (uuid == null || Number.parseInt(uuid, 10) === 0) {
      return null;
    }
    return uuid.replace(/[^a-zA-Z0-9]/g, '');
  }
}

module.exports = { Player };
