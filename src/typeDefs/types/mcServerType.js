const { gql } = require('apollo-server');

const mcServerType = gql`
    type MCServer {
        id: String
        name: String
        version: String
        status: MCServerStatus
    }
    type MCServerStatus {
        serverId: String!,
        isOnline: Boolean!
        onlinePlayerCount: Int
        maxPlayerCount: Int,
        onlinePlayers: [Player],
        queryTime: String,
    }
`;

module.exports = {
  mcServerType,
};
