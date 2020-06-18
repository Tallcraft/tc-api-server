const { Player } = require('../models');

const MAX_PLAYER_QUERY_COUNT = 100;

const playerResolvers = {
  Query: {
    players: ((_, {
      limit, offset, order, searchPlayerName,
    }) => {
      let queryLimit = limit;
      if (queryLimit > MAX_PLAYER_QUERY_COUNT) {
        queryLimit = MAX_PLAYER_QUERY_COUNT;
      }
      return Player.getPlayerList({
        limit: queryLimit, offset, order, searchPlayerName,
      });
    }),
    player: (_, { uuid }) => Player.getByUUID(uuid),
  },
  Player: {
    infractions: (player, _, context) => {
      context.playerUUID = player.uuid;
      return {};
    },
  },
};

module.exports = {
  playerResolvers,
};
