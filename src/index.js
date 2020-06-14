const { ApolloServer } = require('apollo-server');

const BungeeAdminTools = require('./dataSources/BungeeAdminTools');
const config = require('../config.json');

const schema = require('./api/schema');

(async () => {
  const bungeeAdminTools = new BungeeAdminTools(config.datasources.bungeeAdminTools.db);

  const dataSources = { bungeeAdminTools };
  const server = new ApolloServer({ schema: schema(dataSources) });

  const { url } = await server.listen();
  console.info('Started server', url);

  // const bat = new BungeeAdminTools(config.datasources.bungeeAdminTools.db);
  //   //
  //   // const player = await bat.models.player.findByPk('', {
  //   //   include: [bat.models.ban],
  //   // });
  //   // console.debug(JSON.stringify(player.dataValues, null, 2));
})();
