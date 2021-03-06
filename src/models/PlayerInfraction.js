const { bungeeAdminToolsConnector } = require('../connectors');

const { stripUUID } = require('./util');

class PlayerInfraction {
  static async getPlayerBans(playerUUID) {
    const result = await bungeeAdminToolsConnector.models.ban.findAll({
      where: { uuid: stripUUID(playerUUID) },
      attributes: ['isActive', 'reason', ['ban_staff', 'staffName'], ['ban_server', 'serverId'], 'createdAt', 'expiresAt'],
      order: [['ban_begin', 'DESC']],
    });
    return result.map((element) => element.dataValues);
  }
}

module.exports = { PlayerInfraction };
