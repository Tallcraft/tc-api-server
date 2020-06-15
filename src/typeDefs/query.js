const { gql } = require('apollo-server');

const query = gql`
  type Query {
    mcServers: [MCServer]
  }
`;

module.exports = {
  query,
};
