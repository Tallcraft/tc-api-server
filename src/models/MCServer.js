// eslint-disable-next-line max-classes-per-file
const EventEmitter = require('events');
const { mcServerConnector } = require('../connectors');
const { Player } = require('./Player');
const { isNullUUID } = require('./util');

class MCServerStatus extends EventEmitter {
  constructor() {
    super();
    mcServerConnector.on('serverStatusUpdated',
      (id, onlineStatusUpdated) => this.emit('serverStatusUpdated', id, onlineStatusUpdated));
  }
}

const serverStatusEmitter = new MCServerStatus();

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
      const status = await mcServerConnector.getServerStatus(server.id);
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
    // This is a fix for BAT using brackets for the global server identifier which is incompatible
    // with other data sources. A proper fix would be supporting server aliases in the
    // MCServerConnector.
    if (id === '(global)') {
      // eslint-disable-next-line no-param-reassign
      id = 'global';
    }
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
    if (!uuid) {
      return null;
    }

    // Create a map which maps server ids to search promises.
    // Promises will return server boolean if player is found along with server object.
    const searches = new Map();
    mcServerConnector.servers.forEach((server) => {
      const promise = new Promise((resolve) => {
        mcServerConnector.getServerStatus(server.id).then((queryStatus) => {
          const players = queryStatus?.players?.sample;
          const playerFound = players
            && players.some((player) => player.id === uuid);
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
    const queryStatus = await mcServerConnector.getServerStatus(serverId);

    // FIXME: For online servers with no players sample is null
    // How do we differentiate between no players and server does not provide player list?
    const playerSample = queryStatus?.players?.sample;
    if (!playerSample) {
      return null;
    }

    // Server is online but does not export online players.
    if (playerSample.length === 1 && playerSample[0].id === '00000000-0000-0000-0000-000000000000') {
      return null;
    }

    const result = await Promise.all(
      playerSample.map(async (queryPlayer) => {
        // Get player from database
        const player = await Player.getByUUID(queryPlayer.id) || {};
        // If the player is not found in the database, ensure we always set their uuid and name
        // as queried by the MCServerConnector.
        if (!player.uuid) {
          if (isNullUUID(queryPlayer.id)) {
            return null;
          }
          player.uuid = queryPlayer.id;
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
    const status = await mcServerConnector.getServerStatus(serverId);
    if (!status) {
      return null;
    }
    return {
      serverId,
      isOnline: status.isOnline,
      onlinePlayerCount: status.players?.online,
      maxPlayerCount: status.players?.max,
      queryTime: status.queryTime?.toString(10),
    };
  }

  static get serverStatusEmitter() {
    return serverStatusEmitter;
  }
}

module.exports = { MCServer };
