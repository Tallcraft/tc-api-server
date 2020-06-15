const { mcServerConnector } = require('../connectors');

class MCServer {
  static all() {
    return Array.from(mcServerConnector.servers.values());
  }

  static getById(id) {
    return mcServerConnector.servers.get(id);
  }

  static async getStatus(serverId) {
    let status;
    try {
      status = await mcServerConnector.fetchServerStatus(serverId);
    } catch (error) {
      return {
        isOnline: false,
      };
    }
    return {
      isOnline: true,
      onlinePlayerCount: status.players.online,
      maxPlayerCount: status.players.max,
    };
  }
}

module.exports = { MCServer };
