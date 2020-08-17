const { gql } = require('apollo-server');

const playerSearchResultType = gql`
    type PlayerSearchResult {
        "Players matching the search criteria."
        result: [Player]!
        "Absolute amount of players matching the query. This is independent from offset or limit."
        totalCount: Int!,
    }
`;

module.exports = {
  playerSearchResultType,
};
