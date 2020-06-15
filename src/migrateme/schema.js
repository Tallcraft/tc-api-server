const { GraphQLObjectType, GraphQLSchema } = require('graphql');
const resolvers = require('./resolvers');

module.exports = (dataSources) => new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: resolvers(dataSources),
  }),
});
