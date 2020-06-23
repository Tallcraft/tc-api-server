module.exports = (sequelize, DataTypes) => sequelize.define('luckperms_players', {
  uuid: {
    type: DataTypes.STRING(36),
    allowNull: false,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING(16),
    allowNull: false,
  },
  primary_group: {
    type: DataTypes.STRING(36),
    allowNull: false,
  },
}, {
  tableName: 'luckperms_players',
});
