const mc = require('minecraft-protocol');
const EventEmitter = require('events');
const config = require('../../config');

// How long to wait for Minecraft query server reply before marking the server as offline.
const QUERY_TIMEOUT_MS = 5000;

// How often we query servers if there is no per-server poll interval set.
const defaultPollInterval = config.get('connectors.mcServerStatus.defaultPollInterval');

class MCServerConnector extends EventEmitter {
  constructor() {
    super();

    // Maps server id to server metadata
    this._servers = new Map();
    config.get('connectors.mcServerStatus.servers').forEach((server) => {
      this._servers.set(server.id, {
        statusPollInterval: server.pollInterval || defaultPollInterval,
        ...server,
      });
    });

    // Maps server id to server status
    this._serverStatus = new Map();

    // Maps server ids to promises indicating whether a server query has been completed.
    this._lastQuery = new Map();

    // Setup server polling
    this._servers.forEach((server) => {
      const pollInterval = server.pollInterval || defaultPollInterval;
      setInterval(() => this._fetchAndStoreServerStatus(server), pollInterval * 1000);
      // Initial query call
      this._fetchAndStoreServerStatus(server);
    });
  }

  get serversArray() {
    return Array.from(this._servers.values());
  }

  get servers() {
    return this._servers;
  }

  /**
   * Get server status object by server id.
   * @param {String} serverId - The unique identifier of the server.
   * @returns {Promise<{Object}|{null}>} - Promise which resolves the status of server or null if no
   * status is stored yet.
   */
  async getServerStatus(serverId) {
    return this._serverStatus.get(serverId);
  }

  static _fetchServerStatus(server) {
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

  async _fetchAndStoreServerStatus(server) {
    // If a query is still running, wait for it to complete.
    if (this._lastQuery.has(server.id)) {
      await this._lastQuery.get(server.id);
    }
    const requestTime = new Date().getTime();
    let status;

    // Wrap query promise again to mask promise rejection.
    // eslint-disable-next-line no-underscore-dangle
    const lastQueryPromise = MCServerConnector._fetchServerStatus(server)
      .then((queryResult) => {
        // Server query successful, store data and timestamp
        status = {
          queryTime: requestTime,
          ...queryResult,
        };
        const oldStatus = this._serverStatus.get(server.id);
        // Store server status object in map.
        this._serverStatus.set(server.id, status);
        this._emitOnStatusChange(server.id, oldStatus, status);
      });
    this._lastQuery.set(server.id, lastQueryPromise);
  }

  // TODO: Also emit if online players changes
  _emitOnStatusChange(serverId, statusOld, statusNew) {
    const onlineStatusUpdated = statusNew?.isOnline !== statusOld?.isOnline;

    if (!statusOld
      || (!onlineStatusUpdated
      && statusNew.players?.max === statusOld.players?.max
      && statusNew.players?.online === statusOld.players?.online)) {
      return;
    }

    // Only emit updated event if relevant status data changed.
    this.emit('serverStatusUpdated', serverId, onlineStatusUpdated);
  }
}

module.exports = new MCServerConnector();
