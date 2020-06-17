const { mcServersResolvers } = require('./mcServersResolvers');
const { playerResolvers } = require('./playerResolvers');
const { playerInfractionsResolvers } = require('./playerInfractionsResolvers');

const resolvers = [mcServersResolvers, playerResolvers, playerInfractionsResolvers];

module.exports = {
  resolvers,
};
