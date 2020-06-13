module.exports = (sequelize, DataTypes) => {
  const tableOptions = {
    tableName: 'BAT_ban',
    timestamps: false,
  };

  const attributes = {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      field: 'ban_id',
    },
    uuid: {
      type: DataTypes.STRING,
      field: 'UUID',
    },
    banIP: {
      type: DataTypes.STRING,
      field: 'ban_ip',
      allowNull: false,
      validate: {
        isIP: true,
      },
    },
    banStaff: {
      type: DataTypes.STRING,
      field: 'ban_staff',
    },
    banReason: {
      type: DataTypes.STRING,
      field: 'ban_reason',
    },
    banServer: {
      type: DataTypes.STRING,
      field: 'ban_server',
    },
    banBegin: {
      type: DataTypes.DATE,
      field: 'ban_begin',
      validate: {
        isDate: true,
      },
    },
    banEnd: {
      type: DataTypes.DATE,
      field: 'ban_end',
      validate: {
        isDate: true,
      },
    },
    banState: {
      type: DataTypes.TINYINT,
      field: 'ban_state',
      allowNull: false,
    },
    banUnbanDate: {
      type: DataTypes.DATE,
      field: 'ban_unbandate',
      validate: {
        isDate: true,
      },
    },
    banUnbanStaff: {
      type: DataTypes.STRING,
      field: 'ban_unbanstaff',
    },
    banUnbanReason: {
      type: DataTypes.STRING,
      field: 'ban_unbanreason',
    },
  };

  const ban = sequelize.define('ban', attributes, tableOptions);

  ban.associate = (models) => {
    models.ban.belongsTo(models.player, { foreignKey: 'uuid', sourceKey: 'uuid' });
  };

  return ban;
};
