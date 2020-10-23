const { PubSub } = require('apollo-server');

const pubsub = new PubSub();
const { MCServer } = require('../models');

// Init subscriptions
const SERVER_STATUS_UPDATED = 'SERVER_STATUS_UPDATED';
const SERVER_ONLINE_STATUS_UPDATED = 'SERVER_ONLINE_STATUS_UPDATED';

MCServer.serverStatusEmitter.on('serverStatusUpdated', (id, onlineStatusUpdated) => {
  const server = MCServer.getById(id);
  if (onlineStatusUpdated) {
    pubsub.publish(SERVER_ONLINE_STATUS_UPDATED,
      { serverOnlineStatusUpdated: server });
  }
  pubsub.publish(SERVER_STATUS_UPDATED, { serverStatusUpdated: server });
});

const mcServersResolvers = {
  Subscription: {
    serverStatusUpdated: {
      subscribe: () => pubsub.asyncIterator([SERVER_STATUS_UPDATED]),
    },
    serverOnlineStatusUpdated: {
      subscribe: () => pubsub.asyncIterator([SERVER_ONLINE_STATUS_UPDATED]),
    },
  },
  Query: {
    mcServers: (parent, args) => MCServer.getServerList(args),
    mcServer: (parent, { serverId }) => MCServer.getById(serverId),
  },
  MCServer: {
    status: ((parent) => MCServer.getStatus(parent.id)),
  },
  MCServerStatus: {
    onlinePlayers: (parent) => MCServer.getOnlinePlayers(parent.serverId),
  },
};

module.exports = {
  mcServersResolvers,
};
