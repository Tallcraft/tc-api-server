const { mcServerConnector } = require('../connectors');
const { Player } = require('./Player');

class MCServer {
  /**
   * Get list of configured Minecraft servers with optional filtering.
   * @param {Boolean|null} [isOnline] - Filter by online state.
   * @returns {Promise<{Object}[]>} - Array of servers.
   */
  static async getServerList({ isOnline } = {}) {
    // No filter
    if (isOnline == null) {
      return mcServerConnector.serversArray;
    }

    // Filter by online state
    const tasks = mcServerConnector.serversArray.map(async (server) => {
      const status = await mcServerConnector.fetchServerStatusCached(server.id);
      if (status?.isOnline === isOnline) {
        return server;
      }
      return null;
    });

    // Collect query results
    const servers = await Promise.all(tasks);

    // Filter out null servers which didn't match filter above.
    return servers.filter((server) => !!server);
  }

  static getById(id) {
    return mcServerConnector.servers.get(id);
  }

  /**
   * Get server object by UUID of an online player.
   * Async iterates over all server status trying to find the server the player is connected to.
   * @param uuid {String} - Player UUID.
   * @returns {Promise<{Object}|{null}>} - The first server found to which the player is
   * currently connected to, or null if no matching server found.
   */
  static async getByOnlinePlayer(uuid) {
    const cleanUUID = Player.cleanupUUID(uuid);
    if (!cleanUUID) {
      return null;
    }

    // Create a map which maps server ids to search promises.
    // Promises will return server boolean if player is found along with server object.
    const searches = new Map();
    mcServerConnector.servers.forEach((server) => {
      const promise = new Promise((resolve) => {
        mcServerConnector.fetchServerStatusCached(server.id).then((queryStatus) => {
          const players = queryStatus?.players?.sample;
          const playerFound = players
            && players.some((player) => Player.cleanupUUID(player.id) === cleanUUID);
          if (playerFound) {
            resolve({ found: true, server });
          } else {
            resolve({ found: false, server });
          }
        });
      });
      searches.set(server.id, promise);
    });

    while (searches.size) {
      // It's ok to await in loop here because we have to wait for the next promise to resolve.
      // eslint-disable-next-line no-await-in-loop
      const { found, server } = await Promise.race(searches.values());
      if (found) {
        return server;
      }
      searches.delete(server.id);
    }

    // Player not in any of the online servers or status query failed.
    return null;
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
