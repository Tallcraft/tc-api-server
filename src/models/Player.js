const Sequelize = require('sequelize');
const { bungeeAdminToolsConnector, luckPermsConnector } = require('../connectors');

const { isNullUUID, fixUpUUID, stripUUID } = require('./util');

const { Op } = Sequelize;

class Player {
  static async getPlayerList({
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
    const result = await bungeeAdminToolsConnector.models.player.findAll(options);

    // Fix invalid UUIDS without dashes
    return result.map((player) => ({
      ...player.dataValues,
      uuid: fixUpUUID(player.uuid),
    }));
  }

  static async getGroups(uuid) {
    const result = await luckPermsConnector.models.playerPermissions.findAll({
      where: {
        uuid,
        permission: { [Op.like]: 'group.%' },
      },
    });
    // Group memberships are stored as permissions, e.g. Admins have the permission group.admin
    // Convert permission query results to group objects
    // Filter out default group. It does not provide meaningful info.
    return result.map((entry) => ({
      id: entry.permission.split('.')[1],
      serverId: entry.server,
    })).filter((group) => group.id !== 'default');
  }

  static async getByUUID(uuid) {
    if (isNullUUID(uuid)) {
      return null;
    }
    const player = await bungeeAdminToolsConnector.models.player.findByPk(stripUUID(uuid));
    player.dataValues.uuid = fixUpUUID(player.dataValues.uuid);
    return player.dataValues;
  }
}

module.exports = { Player };
