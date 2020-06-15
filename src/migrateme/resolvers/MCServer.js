const { GraphQLID } = require('graphql');
const serverTypeConstructor = require('../types/MCServer');

module.exports = (dataSources) => {
  const { mcServerStatus } = dataSources;
  const MCServer = serverTypeConstructor(dataSources);

  return {
    type: MCServer,
    args: {
      id: {
        type: GraphQLID,
      },
    },
    resolve(_, args) {
      if (!args.id) {
        throw new Error('Server ID is mandatory');
      }
      return mcServerStatus.servers.get(args.id);
    },
  };
};
