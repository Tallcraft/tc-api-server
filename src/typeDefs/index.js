const { query } = require('./query');
const {
  mcServerType, playerType, playerInfractionsType, playerGroupType, playerSearchResultType,
} = require('./types');

const typeDefs = [query, mcServerType, playerType, playerInfractionsType, playerGroupType,
  playerSearchResultType];

module.exports = {
  typeDefs,
};
