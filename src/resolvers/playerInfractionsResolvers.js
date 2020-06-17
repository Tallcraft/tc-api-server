const { PlayerInfraction, MCServer } = require('../models');

const playerInfractionsResolvers = {
  PlayerInfractions: {
     bans: (root, args, context) =>
       PlayerInfraction.getPlayerBans(context.playerUUID),
  },
  PlayerBan: {
    server: ((root, args, context) => {
      return MCServer.getById(root.serverId);
    }),
  }
};

module.exports = {
  playerInfractionsResolvers,
};
