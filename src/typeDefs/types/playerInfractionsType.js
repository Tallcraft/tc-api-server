const { gql } = require('apollo-server');

const playerInfractionsType = gql`
    type PlayerBan {
        "Whether the ban is active."
        isActive: Boolean!
        "Reason for the ban provided by staff."
        reason: String!
        "Name of the staff who issued the ban. May be outdated."
        staffName: String!
        "Server the ban applies to."
        server: MCServer
        "Unix timestamp of when the ban was issued."
        createdAt: String!
        "Unix timestamp of when the ban is lifted. This field is null for permanent bans."
        expiresAt: String
    }
    
    type PlayerInfractions {
        playerUUID: ID!
        bans: [PlayerBan]!
    }
`;

module.exports = {
  playerInfractionsType,
};
