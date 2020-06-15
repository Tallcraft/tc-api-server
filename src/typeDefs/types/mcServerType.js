const { gql } = require('apollo-server');

const mcServerType = gql`
  type MCServer {
      id: String
    name: String
  }
`;

module.exports = {
  mcServerType,
};
