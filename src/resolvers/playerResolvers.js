const { Player } = require('../models');

const playerResolvers = {
  Query: {
    // TODO: set max value for limit / offset argument
    players: (_, { offset = 0, limit = 10 }) => Player.all(offset, limit),
    player: (_, { uuid }) => Player.getByUUID(uuid),
  },
};

module.exports = {
  playerResolvers,
};
