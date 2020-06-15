const { gql } = require('apollo-server');

const query = gql`
    type Query {
        mcServers: [MCServer]
        mcServer(serverId: String): MCServer
        players: [Player]
        player(uuid: String): Player
    }
`;

module.exports = {
  query,
};
