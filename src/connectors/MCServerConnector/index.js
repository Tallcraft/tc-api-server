const mc = require('minecraft-protocol');
const config = require('../../config');

// How long to wait for Minecraft query server reply before marking the server as offline.
const QUERY_TIMEOUT_MS = 5000;

// How often we query servers if there is no per-server poll interval set.
const defaultPollInterval = config.get('connectors.mcServerStatus.defaultPollInterval');

// Maps server id to server metadata
const servers = new Map();
config.get('connectors.mcServerStatus.servers').forEach((server) => {
  servers.set(server.id, {
    statusPollInterval: server.pollInterval || defaultPollInterval,
    ...server,
  });
});

// Maps server id to server status
const serverStatus = new Map();

// Maps server ids to promises indicating whether a server query has been completed.
const lastQuery = new Map();

function fetchServerStatus(server) {
  return new Promise((resolve) => {
    const timeout = setTimeout(() => resolve({ isOnline: false }), QUERY_TIMEOUT_MS);
    try {
      mc.ping(server.statusMonitor, (error, data) => {
        clearTimeout(timeout);
        return resolve({
          isOnline: !error,
          ...data,
        });
      });
    } catch (error) {
      console.error('Error while pining server', error);
      return resolve();
    }
    return undefined;
  });
}

async function fetchAndStoreServerStatus(server) {
  // If a query is still running, wait for it to complete.
  if (lastQuery.has(server.id)) {
    await lastQuery.get(server.id);
  }
  const requestTime = new Date().getTime();
  let status;

  // Wrap query promise again to mask promise rejection.
  const lastQueryPromise = fetchServerStatus(server)
    .then((queryResult) => {
      // Server query successful, store data and timestamp
      status = {
        queryTime: requestTime,
        ...queryResult,
      };
      // Store server status object in map.
      serverStatus.set(server.id, status);
    });
  lastQuery.set(server.id, lastQueryPromise);
}

// Setup server polling
servers.forEach((server) => {
  const pollInterval = server.pollInterval || defaultPollInterval;
  setInterval(() => fetchAndStoreServerStatus(server), pollInterval * 1000);
  // Initial query call
  fetchAndStoreServerStatus(server);
});

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
