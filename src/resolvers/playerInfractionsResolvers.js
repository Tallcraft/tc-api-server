const { PlayerInfraction, MCServer } = require('../models');

const playerInfractionsResolvers = {
  PlayerInfractions: {
    bans: (root, args, context) => PlayerInfraction.getPlayerBans(context.playerUUID),
  },
  PlayerBan: {
    server: ((root) => MCServer.getById(root.serverId)),
  },
};

module.exports = {
  playerInfractionsResolvers,
};
