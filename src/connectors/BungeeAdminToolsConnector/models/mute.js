module.exports = (sequelize, DataTypes) => {
  const tableOptions = {
    tableName: 'BAT_mute',
    timestamps: false,
  };

  const attributes = {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      field: 'mute_id',
    },
    uuid: {
      type: DataTypes.STRING,
      field: 'UUID',
    },
    muteIP: {
      type: DataTypes.STRING,
      field: 'mute_ip',
      allowNull: false,
      validate: {
        isIP: true,
      },
    },
    muteStaff: {
      type: DataTypes.STRING,
      field: 'mute_staff',
    },
    muteReason: {
      type: DataTypes.STRING,
      field: 'mute_reason',
    },
    muteServer: {
      type: DataTypes.STRING,
      field: 'mute_server',
    },
    muteBegin: {
      type: DataTypes.DATE,
      field: 'mute_begin',
      validate: {
        isDate: true,
      },
    },
    muteEnd: {
      type: DataTypes.DATE,
      field: 'mute_end',
      validate: {
        isDate: true,
      },
    },
    muteState: {
      type: DataTypes.TINYINT,
      field: 'mute_state',
      allowNull: false,
    },
    muteUnmuteDate: {
      type: DataTypes.DATE,
      field: 'mute_unmutedate',
      validate: {
        isDate: true,
      },
    },
    muteUnmuteStaff: {
      type: DataTypes.STRING,
      field: 'mute_unmutestaff',
    },
    muteUnmuteReason: {
      type: DataTypes.STRING,
      field: 'mute_unmutereason',
    },
  };

  const mute = sequelize.define('mute', attributes, tableOptions);

  mute.associate = (models) => {
    models.mute.belongsTo(models.player, { foreignKey: 'uuid', sourceKey: 'uuid' });
  };

  return mute;
};
