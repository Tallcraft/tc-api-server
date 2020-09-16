const { gql } = require('apollo-server');

const mcServerType = gql`
    type MCServer {
        "Unique identifier of the server."
        id: ID!
        "Human readable name."
        name: String!
        "Minecraft server version."
        version: String!
        "Public client connection address."
        publicAddress: String
        "Server status information."
        status: MCServerStatus
        "How often the status information is fetched from the server in seconds."
        statusPollInterval: Int
    }
    type MCServerStatus {
        "Unique identifier of the server."
        serverId: String!
        "Whether the server is online."
        isOnline: Boolean
        "How many player are currently on the server."
        onlinePlayerCount: Int
        "Maximum player capacity."
        maxPlayerCount: Int
        "Information on the players currently on the server."
        onlinePlayers: [Player]
        "When the status information was last refreshed."
        queryTime: String
    }
`;

module.exports = {
  mcServerType,
};
