const { MCServer } = require('../models');

const mcServersResolvers = {
  Query: {
    mcServers: () => MCServer.all(),
  },
};

module.exports = {
  mcServersResolvers,
};
