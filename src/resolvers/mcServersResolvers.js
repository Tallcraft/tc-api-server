const { MCServer, Player } = require('../models');

const mcServersResolvers = {
  Query: {
    mcServers: () => MCServer.all(),
    mcServer: (parent, { serverId }) => MCServer.getById(serverId),
  },
  MCServer: {
    status: ((parent) => MCServer.getStatus(parent.id)),
  },
  MCServerStatus: {
    onlinePlayers: async (parent) => {
      if (!parent.onlinePlayers) {
        return null;
      }
      // Populate player data queried by MCServerConnector with data from BAT connector
      const result = await Promise.all(
        parent.onlinePlayers
          .map(async (statusPlayer) => {
            // Get player from database
            const player = await Player.getByUUID(statusPlayer.id) || {};
            // If the player is not found in the database, ensure we always set their uuid and name
            // as queried by the MCServerConnector.
            if (!player.uuid) {
              const uuid = Player.cleanupUUID(statusPlayer.id);
              if (!uuid) {
                return null;
              }
              player.uuid = uuid;
            }
            // Name is only set by data from the MCServerConnector,
            // because this is guaranteed to be recent.
            player.name = statusPlayer.name;
            return player;
          }),
      );
      // Remove any null objects
      return result.filter((player) => !!player);
    },
  },
};

module.exports = {
  mcServersResolvers,
};
