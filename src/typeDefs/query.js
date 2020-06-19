const { gql } = require('apollo-server');

const query = gql`
  enum ListOrder {
      DESC,
      ASC,
  }
    type Query {
        mcServers: [MCServer]
        mcServer(
            "The unique identifier of the server."
            serverId: String
        ): MCServer
        players(
            "Limit the amount of results that is returned."
            limit: Int = 10,
            "The amount of items to shift the result list by. Can be used for pagination."
            offset: Int = 0,
            "Whether to sort ascending or descending by player first join date."
            order: ListOrder = DESC,
            "Filter results by last seen player name. Supports SQL LIKE patterns."
            searchPlayerName: String
        ): [Player]!
        player(
            "The unique identifier of the player as defined by Minecraft."
            uuid: ID
        ): Player
    }
`;

module.exports = {
  query,
};
