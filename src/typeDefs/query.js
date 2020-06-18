const { gql } = require('apollo-server');

const query = gql`
  enum ListOrder {
      DESC,
      ASC,
  }
    type Query {
        mcServers: [MCServer]
        mcServer(serverId: String): MCServer
        players(limit: Int = 10, offset: Int = 0, order: ListOrder = DESC, searchPlayerName: String ): [Player]!
        player(uuid: ID): Player
    }
`;

module.exports = {
  query,
};
