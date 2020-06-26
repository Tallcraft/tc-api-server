const mc = require('minecraft-protocol');
const config = require('../../config');

// How many miliseconds to cache Minecraft query data
const SERVER_QUERY_INTERVAL_MS = 5 * 60 * 1000; // 5 minutes
const QUERY_TIMEOUT_MS = 5000;

// Map of server metadata
const servers = new Map();
config.get('connectors.mcServerStatus.servers').forEach((server) => {
  servers.set(server.id, server);
});

// Stores server status info
const serverStatus = new Map();

// Maps server ids to promises indicating whether a server query has been completed.
const lastQuery = new Map();

function fetchServerStatus(server) {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      reject(new Error(`Timed out while querying server '${server.id}`));
    }, QUERY_TIMEOUT_MS);
    mc.ping({
      host: server.host,
      port: server.port,
      version: server.version,
    }, (error, data) => {
      if (error) {
        return reject(error);
      }
      clearTimeout(timeout);
      return resolve({
        isOnline: true,
        ...data,
      });
    });
    return undefined;
  });
}

async function fetchAndStoreServerStatus(server) {
  // If a query is still running, wait for it to complete.
  if (lastQuery.has(server.id)) {
    await lastQuery.get(server.id);
  }
  const requestTime = new Date().getTime();

  // Wrap query promise again to mask promise rejection.
  const lastQueryPromise = new Promise((resolve) => {
    let status;
    fetchServerStatus(server)
      .then((queryResult) => {
        // Server query successful, store data and timestamp
        status = {
          queryTime: requestTime,
          ...queryResult,
        };
      })
      .catch(() => {
        // Server query failed, mark it as offline
        status = {
          isOnline: false,
          queryTime: requestTime,
        };
      })
      .finally(() => {
        // Store server status object in map.
        serverStatus.set(server.id, status);
        resolve();
      });
  });
  lastQuery.set(server.id, lastQueryPromise);
}

async function pollServerStatus() {
  servers.forEach((server) => {
    fetchAndStoreServerStatus(server);
  });
}

// Setup interval to query servers on a predefined interval.
setInterval(pollServerStatus, SERVER_QUERY_INTERVAL_MS);
// setInterval only starts after interval, make initial call
pollServerStatus();

const mcServerConnector = {
  get serversArray() {
    return Array.from(servers.values());
  },

  get servers() {
    return servers;
  },

  /**
   * Get server status object by server id.
   * @param {String} serverId - The unique identifier of the server.
   * @returns {Promise<{Object}|{null}>} - Promise which resolves the status of server or null if no
   * status is stored yet.
   */
  async getServerStatus(serverId) {
    return serverStatus.get(serverId);
  },
};

module.exports = { mcServerConnector };
