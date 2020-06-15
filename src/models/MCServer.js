const { mcServerConnector } = require('../connectors');

class MCServer {
  static all() {
    return Array.from(mcServerConnector.servers.entries()).map(([key, value]) => ({
      id: key,
      ...value,
    }));
  }
}

module.exports = { MCServer };
