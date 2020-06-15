const mc = require('minecraft-protocol');
const config = require('../../../config.json');

const servers = new Map();
config.connectors.mcServerStatus.servers.forEach((server) => {
  servers.set(server.id, server);
});

const mcServerConnector = {
  get servers() {
    return servers;
  },
  getStatus(serverId) {
    return new Promise((resolve, reject) => {
      const server = servers.get(serverId);
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
  },
};

module.exports = { mcServerConnector };
