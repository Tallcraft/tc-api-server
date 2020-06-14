const { GraphQLObjectType, GraphQLString, GraphQLList } = require('graphql');

module.exports = ({ bungeeAdminTools }) => new GraphQLObjectType({
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
      activeServerBans: {
        type: GraphQLList(GraphQLString),
        description: 'Array of names of servers, which player is banned from',
        async resolve(player) {
          const queryResult = await bungeeAdminTools.models.ban.findAll({
            attributes: ['banServer'],
            where: {
              uuid: player.uuid, banState: 1,
            },
          });
          return queryResult.map((el) => el.dataValues?.banServer).filter((el) => el != null);
        },
      },
    };
  },
});
