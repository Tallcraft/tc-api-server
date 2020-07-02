const convict = require('convict');

convict.addFormat(require('convict-format-with-validator').ipaddress);

convict.addFormat({
  name: 'mc-server-array',
  validate(servers, schema) {
    if (!Array.isArray(servers)) {
      throw new Error('must be of type Array');
    }
    servers.forEach((server) => {
      convict(schema.children).load(server).validate({ allowed: 'strict' });
    });
  },
});

const schema = {
  env: {
    doc: 'The application environment.',
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV',
  },
  apollo: {
    host: {
      doc: 'The host address to bind.',
      format: String,
      default: 'localhost',
      env: 'HOST',
    },
    port: {
      doc: 'The port to bind.',
      format: 'port',
      default: 4000,
      env: 'PORT',
      arg: 'port',
    },
    maxQueryCost: {
      doc: 'Limit complexity of queries to prevent abuse. Set to -1 to disable limit.',
      format: 'int',
      default: 2000,
    },
  },
  connectors: {
    bungeeAdminTools: {
      db: {
        host: {
          doc: 'The database host.',
          format: String,
          default: 'localhost',
          env: 'BAT_DB_HOST',
        },
        port: {
          doc: 'The database port.',
          format: 'port',
          default: '3306',
          env: 'LP_DB_PORT',
        },
        database: {
          doc: 'The database name.',
          format: String,
          default: undefined,
          env: 'BAT_DB_NAME',
        },
        user: {
          doc: 'The database user.',
          format: String,
          default: undefined,
          env: 'BAT_DB_USER',
        },
        password: {
          doc: 'The database user password.',
          format: String,
          default: undefined,
          sensitive: true,
          env: 'BAT_DB_PASSWORD',
        },
      },
    },
    luckPerms: {
      db: {
        host: {
          doc: 'The database host.',
          format: String,
          default: 'localhost',
          env: 'LP_DB_HOST',
        },
        port: {
          doc: 'The database port.',
          format: 'port',
          default: '3306',
          env: 'LP_DB_PORT',
        },
        database: {
          doc: 'The database name.',
          format: String,
          default: undefined,
          env: 'LP_DB_NAME',
        },
        user: {
          doc: 'The database user.',
          format: String,
          default: undefined,
          env: 'LP_DB_USER',
        },
        password: {
          doc: 'The database user password.',
          format: String,
          default: undefined,
          sensitive: true,
          env: 'LP_DB_PASSWORD',
        },
      },
    },
    mcServerStatus: {
      defaultPollInterval: {
        doc: 'Default value for how often to query servers in seconds.',
        type: Number,
        default: 300,
      },
      servers: {
        doc: 'A collection of mc server info.',
        format: 'mc-server-array',
        default: [],
        children: {
          id: {
            doc: 'Unique identifier.',
            format: String,
            default: undefined,
          },
          name: {
            doc: 'Human readable name.',
            format: String,
            default: undefined,
          },
          host: {
            doc: 'Hostname of the mc server.',
            format: String,
            default: 'localhost',
          },
          port: {
            doc: 'Port of the mc server.',
            format: 'port',
            default: 25565,
          },
          version: {
            doc: 'Minecraft server version',
            format: String,
            default: undefined,
          },
          publicAddress: {
            doc: 'Publicly reachable server address. To be used in Minecraft clients.',
            format: String,
            default: undefined,
          },
          pollInterval: {
            doc: 'How often to poll server status in seconds',
            format: Number,
            default: 300,
          },
        },
      },
    },
  },
};

// Define a schema
const config = convict(schema);

config.loadFile(process.env.CONFIG_PATH || './config.json');

// Perform validation
config.validate({ allowed: 'strict' });

module.exports = config;
