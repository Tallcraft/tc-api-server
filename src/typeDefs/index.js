const { query } = require('./query');
const {
  mcServerType, playerType, playerInfractionsType, playerGroupType,
} = require('./types');

const typeDefs = [query, mcServerType, playerType, playerInfractionsType, playerGroupType];

module.exports = {
  typeDefs,
};
