const { MCServer } = require('../models');

const mcServersResolvers = {
  Query: {
    mcServers: () => MCServer.all(),
    mcServer: (id) => MCServer.getById(id),
  },
};

module.exports = {
  mcServersResolvers,
};
