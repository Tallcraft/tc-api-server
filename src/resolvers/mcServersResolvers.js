const { MCServer } = require('../models');

const mcServersResolvers = {
  Query: {
    mcServers: () => MCServer.all(),
    mcServer: (parent, { serverId }) => MCServer.getById(serverId),
  },
  MCServer: {
    status: ((parent) => MCServer.getStatus(parent.id)),
  },
  MCServerStatus: {
    onlinePlayers: (parent) => MCServer.getOnlinePlayers(parent.serverId),
  },
};

module.exports = {
  mcServersResolvers,
};
