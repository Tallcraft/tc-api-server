const { gql } = require('apollo-server');

const playerType = gql`
    type Player {
        "Global unique identifier"
        uuid: ID!
        "Current player name, may be unknown."
        name: String,
        "Last name of the player the server saw. May be outdated or unset."
        lastSeenName: String
        "Unix timestamp of last player login."
        lastLogin: String
        "Unix timestamp of first player login on any server of the network."
        firstLogin: String
        "Minecraft server the player is currently connected to. Null if player is not connected to any server or we don't have information about the server."
        connectedTo: MCServer
        "Player infractions, such as bans."
        infractions: PlayerInfractions
        "List of groups (ranks) this player belongs to."
        groups: [PlayerGroup]
    }
`;

module.exports = {
  playerType,
};
