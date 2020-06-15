const { GraphQLObjectType, GraphQLString, GraphQLList } = require('graphql');

module.exports = ({ mcServerStatus }) => new GraphQLObjectType({
  name: 'mcserver',
  description: 'Minecraft Server',
  fields() {
    return {
      id: {
        type: GraphQLString,
        description: 'Server id',
      },
      name: {
        type: GraphQLString,
        description: 'Server name',
      },
    };
  },
});
