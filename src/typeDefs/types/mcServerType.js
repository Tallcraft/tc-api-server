const { gql } = require('apollo-server');

const mcServerType = gql`
    type MCServer {
        "Unique identifier of the server."
        id: ID!
        "Human readable name."
        name: String!
        "Minecraft server version."
        version: String!
        "Server status information."
        status: MCServerStatus
    }
    type MCServerStatus {
        "Unique identifier of the server."
        serverId: String!,
        "Whether the server is online."
        isOnline: Boolean!
        "How many player are currently on the server."
        onlinePlayerCount: Int
        "Maximum player capacity."
        maxPlayerCount: Int,
        "Information on the players currently on the server."
        onlinePlayers: [Player],
        "When the status information was last refreshed."
        queryTime: String,
    }
`;

module.exports = {
  mcServerType,
};
