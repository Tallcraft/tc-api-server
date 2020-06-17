const { gql } = require('apollo-server');

const playerType = gql`
    type Player {
        uuid: ID
        lastSeenName: String!
        lastLogin: String!
        firstLogin: String!
        infractions: PlayerInfractions!
    }
`;

module.exports = {
  playerType,
};
