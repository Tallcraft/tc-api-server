const { gql } = require('apollo-server');

const playerInfractionsType = gql`
    type PlayerBan {
        isActive: Boolean!
        reason: String!
        staffName: String!
        server: MCServer
        createdAt: String!
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
