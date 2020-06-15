const { ApolloServer } = require('apollo-server');

const { resolvers } = require('./resolvers');
const { typeDefs } = require('./typeDefs');

(async () => {
  const server = new ApolloServer({ typeDefs, resolvers });

  const { url } = await server.listen();
  console.info('Started server at', url);
})();
