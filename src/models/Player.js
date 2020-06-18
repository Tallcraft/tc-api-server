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
            Sequelize.col('BAT_player')), 'LIKE', `%${searchPlayerName}%`,
        ),
      };
    }
    return bungeeAdminToolsConnector.models.player.findAll(options);
  }

  static getByUUID(uuid) {
    return bungeeAdminToolsConnector.models.player.findByPk(uuid.replace('-', ''));
  }
}

module.exports = { Player };
