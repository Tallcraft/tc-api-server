const Sequelize = require('sequelize');
const { bungeeAdminToolsConnector, luckPermsConnector } = require('../connectors');

const { Op } = Sequelize;

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

  static async getGroups(uuid) {
    const validUUID = Player.expandUUID(uuid);
    if (!validUUID) {
      return null;
    }
    const result = await luckPermsConnector.models.playerPermissions.findAll({
      where: {
        uuid: validUUID,
        permission: { [Op.like]: 'group.%' },
      },
    });
    // Group memberships are stored as permissions, e.g. Admins have the permission group.admin
    // Convert permission query results to group objects
    return result.map((entry) => ({
      id: entry.permission.split('.')[1],
      serverId: entry.server,
    }));
  }

  static getByUUID(uuid) {
    const cleanUUID = Player.cleanupUUID(uuid);
    if (!cleanUUID) {
      return null;
    }
    return bungeeAdminToolsConnector.models.player.findByPk(cleanUUID);
  }

  /**
   * Takes a UUID without dashes and inserts then.
   * This can go once we use valid UUIDS everywhere, see #6
   * the RFC.
   * @param {String} uuid - UUID string without dashes.
   * @returns {String} - Valid UUID with dashes or null if input UUID is invalid.
   */
  static expandUUID(uuid) {
    const i = uuid;
    try {
      return `${i.substr(0, 8)}-${i.substr(8, 4)}-${i.substr(12, 4)}-${i.substr(16, 4)}-${i.substr(20)}`;
    } catch (error) {
      return null;
    }
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
