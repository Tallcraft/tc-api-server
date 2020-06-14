const { GraphQLID } = require('graphql');
const playerTypeConstructor = require('../types/player');

module.exports = (dataSources) => {
  const { bungeeAdminTools } = dataSources;
  const Player = playerTypeConstructor(dataSources);

  return {
    type: Player,
    args: {
      uuid: {
        type: GraphQLID,
      },
    },
    resolve(_, args) {
      if (!args.uuid) {
        throw new Error('UUID is mandatory');
      }
      return bungeeAdminTools.models.player.findByPk(args.uuid);
    },
  };
};
