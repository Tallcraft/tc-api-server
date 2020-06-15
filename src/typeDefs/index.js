const { query } = require('./query');
const { mcServerType, playerType } = require('./types');

const typeDefs = [query, mcServerType, playerType];

module.exports = {
  typeDefs,
};
