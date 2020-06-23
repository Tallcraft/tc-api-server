const { Player, MCServer } = require('../models');

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
    connectedTo: ((player) => MCServer.getByOnlinePlayer(player.uuid)),
    infractions: (player, _, context) => {
      context.playerUUID = player.uuid;
      return {};
    },
    groups: ((player) => Player.getGroups(player.uuid)),
  },
  PlayerGroup: {
    server: ((group) => MCServer.getById(group.serverId)),
  },
};

module.exports = {
  playerResolvers,
};
