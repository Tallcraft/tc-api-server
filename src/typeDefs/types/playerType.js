const { gql } = require('apollo-server');

const playerType = gql`
    type Player {
        uuid: ID
        lastSeenName: String
        lastLogin: String
        firstLogin: String
    }
`;

module.exports = {
  playerType,
};
