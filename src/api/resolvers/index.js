const player = require('./player');
const MCServer = require('./MCServer');

const resolverConstructors = { player, MCServer };

module.exports = (dataSources) => {
  const resolvers = {};
  Object.keys(resolverConstructors).forEach((key) => {
    resolvers[key] = resolverConstructors[key](dataSources);
  });
  return resolvers;
};
