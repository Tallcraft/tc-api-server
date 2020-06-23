const { gql } = require('apollo-server');

const playerGroupType = gql`    
    type PlayerGroup {
        "Unique identifier and displayname for this group."
        id: ID!
        "Server this group applies to."
        server: MCServer
    }
`;

module.exports = {
  playerGroupType,
};
