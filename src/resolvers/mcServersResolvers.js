const { MCServer } = require('../models');

const mcServersResolvers = {
  Query: {
    mcServers: () => MCServer.all(),
    mcServer: (parent, { serverId }) => MCServer.getById(serverId),
  },
  MCServer: {
    status(parent) {
      return MCServer.getStatus(parent.id);
    },
  },
};

module.exports = {
  mcServersResolvers,
};
