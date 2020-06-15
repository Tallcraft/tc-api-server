const { query } = require('./query');
const { mcServerType } = require('./types');

const typeDefs = [query, mcServerType];

module.exports = {
  typeDefs,
};
