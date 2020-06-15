const mc = require('minecraft-protocol');
const config = require('../../../config.json');

// How many miliseconds to cache Minecraft query data
const CACHE_QUERY_EXPIRY_MS = 5 * 60 * 1000; // 5 minutes

// Map of server metadata
const servers = new Map();
config.connectors.mcServerStatus.servers.forEach((server) => {
  servers.set(server.id, server);
});

// Acts as in memory cache for server mc query results
const serverStatus = new Map();

const mcServerConnector = {
  get servers() {
    return servers;
  },
  /**
   * {@link fetchServerStatus}, but with an in memory cache.
   * Cache expires after {@link CACHE_QUERY_EXPIRY_MS}.
   * @param {String} serverId - Identifier of the server to fetch status for.
   * Server must be in configuration to be queried.
   * @returns {Promise<Object|null>} - Returns server status object once queried or null if server
   * not found.
   * @throws {Error} - Throws any errors by mc query library, including offline servers.
   */
  async fetchServerStatusCached(serverId) {
    const server = servers.get(serverId);
    // Don't attempt to cache servers we don't monitor
    if (!server) {
      return null;
    }
    const requestTime = new Date().getTime();
    const lastStatus = serverStatus.get(server.id);
    if (lastStatus && requestTime - lastStatus.queryTime < CACHE_QUERY_EXPIRY_MS) {
      return lastStatus;
    }
    const status = await this.fetchServerStatus(server.id);
    status.queryTime = requestTime;
    serverStatus.set(server.id, status);
    return status;
  },
  fetchServerStatus(serverId) {
    return new Promise((resolve, reject) => {
      const server = servers.get(serverId);
      if (!server) {
        // We don't have information about this server
        return null;
      }
      mc.ping({
        host: server.host,
        port: server.port,
        version: server.version,
      }, (error, data) => {
        if (error) {
          return reject(error);
        }
        return resolve(data);
      });
    });
  },
};

module.exports = { mcServerConnector };
