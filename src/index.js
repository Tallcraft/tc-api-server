const { ApolloServer } = require('apollo-server');
const { createComplexityLimitRule } = require('graphql-validation-complexity');

const { resolvers } = require('./resolvers');
const { typeDefs } = require('./typeDefs');

const config = require('./config');

(async () => {
  process.on('SIGINT', () => {
    process.exit();
  });

  const maxQueryCost = config.get('apollo.maxQueryCost');
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    validationRules: maxQueryCost > 0 ? [createComplexityLimitRule(maxQueryCost)] : [],
    introspection: true,
    playground: true,
    cache: 'bounded',
    persistedQueries: false,
  });

  const { url } = await server.listen(config.get('apollo'));
  console.info('Started server at', url);
})();
