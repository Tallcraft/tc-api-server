const { gql } = require('apollo-server');

const playerType = gql`
    type Player {
        # Global unique identifier
        uuid: ID!
        # Current player name, may be unknown.
        name: String,
        # Last name of the player the server saw. May be outdated or unset.
        lastSeenName: String
        # UNIX timestamp of last player login.
        lastLogin: String
        # Unix timestamp of first player login on any server of the network.
        firstLogin: String
        infractions: PlayerInfractions
    }
`;

module.exports = {
  playerType,
};
