const { ApolloServer } = require('apollo-server');

const { resolvers } = require('./resolvers');
const { typeDefs } = require('./typeDefs');

const config = require('./config');

(async () => {
  process.on('SIGINT', () => {
    process.exit();
  });

  const server = new ApolloServer({
    typeDefs, resolvers, introspection: true, playground: true,
  });

  const { url } = await server.listen(config.get('apollo'));
  console.info('Started server at', url);
})();
