const player = require('./player');

const resolverConstructors = { player };

module.exports = (dataSources) => {
  const resolvers = {};
  Object.keys(resolverConstructors).forEach((key) => {
    resolvers[key] = resolverConstructors[key](dataSources);
  });
  return resolvers;
};
