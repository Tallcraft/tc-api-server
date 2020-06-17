const { Player } = require('../models');

const MAX_PLAYER_QUERY_COUNT = 100;

const playerResolvers = {
  Query: {
    players: ((_, { limit, offset, order }) => {
      if(limit > MAX_PLAYER_QUERY_COUNT) {
        limit = MAX_PLAYER_QUERY_COUNT;
      }
      return Player.getPlayerList({ limit, offset, order })
    }),
    player: (_, { uuid }) => Player.getByUUID(uuid),
  },
  Player: {
    infractions: (player, _, context) => {
      context.playerUUID = player.uuid;
      return {};
    }
  }
};

module.exports = {
  playerResolvers,
};
