const { mcServerConnector } = require('../connectors');
const { Player } = require('./Player');

class MCServer {
  static all() {
    return Array.from(mcServerConnector.servers.values());
  }

  static getById(id) {
    return mcServerConnector.servers.get(id);
  }

  static async getOnlinePlayers(serverId) {
    const queryStatus = await mcServerConnector.fetchServerStatusCached(serverId);
    if (!queryStatus?.players?.sample) {
      return null;
    }

    const result = await Promise.all(
      queryStatus.players.sample
        .map(async (queryPlayer) => {
          // Get player from database
          const player = await Player.getByUUID(queryPlayer.id) || {};
          // If the player is not found in the database, ensure we always set their uuid and name
          // as queried by the MCServerConnector.
          if (!player.uuid) {
            const uuid = Player.cleanupUUID(queryPlayer.id);
            if (!uuid) {
              return null;
            }
            player.uuid = uuid;
          }
          // Name is only set by data from the MCServerConnector,
          // because this is guaranteed to be recent.
          player.name = queryPlayer.name;
          return player;
        }),
    );
    // Remove any null objects
    return result.filter((player) => !!player);
  }

  static async getStatus(serverId) {
    const status = await mcServerConnector.fetchServerStatusCached(serverId);
    return {
      serverId,
      isOnline: status.isOnline,
      onlinePlayerCount: status.players?.online,
      maxPlayerCount: status.players?.max,
      queryTime: status.queryTime?.toString(10),
    };
  }
}

module.exports = { MCServer };
