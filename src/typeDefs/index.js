const { query } = require('./query');
const { mcServerType, playerType, playerInfractionsType } = require('./types');

const typeDefs = [query, mcServerType, playerType, playerInfractionsType];

module.exports = {
  typeDefs,
};
