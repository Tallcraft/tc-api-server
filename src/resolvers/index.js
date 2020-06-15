const { mcServersResolvers } = require('./mcServersResolvers');
const { playerResolvers } = require('./playerResolvers');

const resolvers = [mcServersResolvers, playerResolvers];

module.exports = {
  resolvers,
};
