const { MCServer } = require('../models');

const mcServersResolvers = {
  Query: {
    mcServers: (parent, args) => MCServer.getServerList(args),
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
