const { ApolloServer } = require('apollo-server');

const { resolvers } = require('./resolvers');
const { typeDefs } = require('./typeDefs');

const config = require('../config.json');

(async () => {
  const server = new ApolloServer({ typeDefs, resolvers });

  const { url } = await server.listen(config.graphql);
  console.info('Started server at', url);
})();
