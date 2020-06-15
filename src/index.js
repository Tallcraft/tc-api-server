const { ApolloServer } = require('apollo-server');

const { resolvers } = require('./resolvers');
const { typeDefs } = require('./typeDefs');

//const config = require('../config.json');

// TODO: connectors: https://www.graphql-tools.com/docs/connectors/
// TODO: directory structure according to https://github.com/betaflag/graphql-server-scaffolding/tree/master/role-oriented

(async () => {
  const server = new ApolloServer({ typeDefs, resolvers });

  const { url } = await server.listen();
  console.info('Started server at', url);
})();
