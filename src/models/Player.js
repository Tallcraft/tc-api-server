const Sequelize = require('sequelize');
const { bungeeAdminToolsConnector, luckPermsConnector } = require('../connectors');

const { isNullUUID, fixUpUUID, stripUUID } = require('./util');

const { Op } = Sequelize;

class Player {
  static async getPlayerList({
    limit, offset, order, matchAll, searchPlayerName,
  }) {
    const options = {
      offset,
      limit,
      order: [['firstLogin', order]],
    };

    if (searchPlayerName) {

        var nameMatchElements = searchPlayerName.map(nameElement => {
            return {
                lastSeenName: { 
                    [Op.like] : nameElement,
                }
            }
        })
        
        // And forces all to match, Or allows any to match
        if(matchAll) {
            options.where = {
                [Op.and] : nameMatchElements
              };
        } else {
            options.where = {
                [Op.or] : nameMatchElements
            };
        }
    }
    const playerQuery = bungeeAdminToolsConnector.models.player.findAll(options)
      // Fix invalid UUIDS without dashes
      .then((result) => result.map((player) => ({
        ...player.dataValues,
        uuid: fixUpUUID(player.uuid),
      })));

    // Get count of players matching the query.
    // Don't use offset or limit to get the total result count.
    const countQuery = bungeeAdminToolsConnector.models.player.count({
      where: options.where,
    });

    // Collect query results and return
    const [result, totalCount] = await Promise.all([playerQuery, countQuery]);
    return { result, totalCount };
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
    if (!player) {
      return null;
    }
    player.dataValues.uuid = fixUpUUID(player.dataValues.uuid);
    return player.dataValues;
  }
}

module.exports = { Player };