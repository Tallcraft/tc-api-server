const { GraphQLID } = require('graphql');

const Player = require('../types/player');

module.exports = ({ bungeeAdminTools }) => ({
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
});
