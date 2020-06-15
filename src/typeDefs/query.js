const { gql } = require('apollo-server');

const query = gql`
  type Query {
    mcServers: [MCServer]
      mcServer(serverId: String): MCServer
  }
`;

module.exports = {
  query,
};
