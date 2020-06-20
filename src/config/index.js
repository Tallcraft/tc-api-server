const convict = require('convict');

convict.addFormat(require('convict-format-with-validator').ipaddress);

// Define a schema
const config = convict({
  env: {
    doc: 'The application environment.',
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV',
  },
  apollo: {
    ip: {
      doc: 'The IP address to bind.',
      format: 'ipaddress',
      default: '127.0.0.1',
      env: 'IP_ADDRESS',
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
    mcServerStatus: {
      servers: {
        doc: 'A collection of mc server info.',
        format: Array,
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
        },
      },
    },
  },
});

config.loadFile(process.env.CONFIG_PATH || './config.json');

// Perform validation
config.validate({ allowed: 'strict' });

module.exports = config;
