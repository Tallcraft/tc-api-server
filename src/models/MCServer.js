const { mcServerConnector } = require('../connectors');

class MCServer {
  static all() {
    return Array.from(mcServerConnector.servers.values());
  }

  static getById(id) {
    return mcServerConnector.servers.get(id);
  }
}

module.exports = { MCServer };
