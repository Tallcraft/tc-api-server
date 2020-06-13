const config = require('../config.json');

const BungeeAdminTools = require('./datasources/BungeeAdminTools');

(async () => {
  const bat = new BungeeAdminTools(config.datasources.bungeeAdminTools.db);

  const player = await bat.models.player.findByPk('', {
    include: [bat.models.ban],
  });
  console.debug(JSON.stringify(player.dataValues, null, 2));
})();
