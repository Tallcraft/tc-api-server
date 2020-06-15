const { mcServerConnector } = require('../connectors');

class MCServer {
  static all() {
    return Array.from(mcServerConnector.servers.values());
  }

  static getById(id) {
    return mcServerConnector.servers.get(id);
  }

  static async getStatus(serverId) {
    const status = await mcServerConnector.fetchServerStatusCached(serverId);
    return {
      isOnline: status.isOnline,
      onlinePlayerCount: status.players?.online,
      maxPlayerCount: status.players?.max,
      queryTime: status.queryTime?.toString(10),
    };
  }
}

module.exports = { MCServer };
