module.exports = (sequelize, DataTypes) => {
  const tableOptions = {
    tableName: 'BAT_kick',
    timestamps: false,
  };

  const attributes = {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      field: 'kick_id',
    },
    uuid: {
      type: DataTypes.STRING,
      field: 'UUID',
    },
    kickStaff: {
      type: DataTypes.STRING,
      field: 'kick_staff',
    },
    kickReason: {
      type: DataTypes.STRING,
      field: 'kick_reason',
    },
    kickServer: {
      type: DataTypes.STRING,
      field: 'kick_server',
    },
    kickDate: {
      type: DataTypes.DATE,
      field: 'kick_date',
      validate: {
        isDate: true,
      },
    },
  };

  const kick = sequelize.define('kick', attributes, tableOptions);

  kick.associate = (models) => {
    models.kick.belongsTo(models.player, { foreignKey: 'uuid', sourceKey: 'uuid' });
  };

  return kick;
};
