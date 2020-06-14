const { GraphQLObjectType, GraphQLString } = require('graphql');

module.exports = new GraphQLObjectType({
  name: 'player',
  description: 'player',
  fields() {
    return {
      uuid: {
        type: GraphQLString,
        description: 'Player unique identifier',
      },
      name: {
        type: GraphQLString,
        description: 'Last known player nickname',
      },
      lastLogin: {
        type: GraphQLString,
        description: 'Timestamp of last login',
      },
      firstLogin: {
        type: GraphQLString,
        description: 'Timestamp of first ever login',
      },
    };
  },
});
