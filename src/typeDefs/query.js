const { gql } = require('apollo-server');

const query = gql`
    enum ListOrder {
        DESC,
        ASC,
    }
    type Query {
        mcServers(
            "Filter servers by online state. Set to null to disable filter."
            isOnline: Boolean = null,
        ): [MCServer]
        mcServer(
            "The unique identifier of the server."
            serverId: String
        ): MCServer
        players(
            "Limit the amount of results that is returned."
            limit: Int = 10,
            "The amount of items to shift the result list by. Can be used for pagination."
            offset: Int = 0,
            "Whether to sort ascending or descending by player first join date."
            order: ListOrder = DESC,
            "If true, searchPlayerName must have all elements match a username, if false any can match."
            matchAll: Boolean = true,
            "Filter results by last seen player name. Supports SQL LIKE patterns. Matching parameters defined by matchAll"
            searchPlayerName: [String]
        ): PlayerSearchResult!
        player(
            "The unique identifier of the player as defined by Minecraft. Must be a valid UUIDv4 with dashes."
            uuid: ID!
        ): Player
    }
    type Subscription {
        "Updates whenever the status of a server changes. This includes online state and player count."
        serverStatusUpdated: MCServer!
        "Updated when the online status of a server changes."
        serverOnlineStatusUpdated: MCServer!
    }
`;

module.exports = {
  query,
};
