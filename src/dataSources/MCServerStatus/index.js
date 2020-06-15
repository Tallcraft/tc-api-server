const mc = require('minecraft-protocol');

module.exports = class MCServerStatus {
  constructor({ servers }) {
    this.servers = new Map(Object.entries(servers));
  }

  getStatus(serverId) {
    return new Promise((resolve, reject) => {
      const server = this.servers.get(serverId);
      if (!server) {
        return reject(new Error(`Server '${serverId}' is not configured.`));
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
  }
};
