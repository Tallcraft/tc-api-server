module.exports = (sequelize, DataTypes) => sequelize.define('luckperms_group_permissions', {
  id: {
    type: DataTypes.INTEGER(11),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(36),
    allowNull: false,
  },
  permission: {
    type: DataTypes.STRING(200),
    allowNull: false,
  },
  value: {
    type: DataTypes.INTEGER(1),
    allowNull: false,
  },
  server: {
    type: DataTypes.STRING(36),
    allowNull: false,
  },
  world: {
    type: DataTypes.STRING(36),
    allowNull: false,
  },
  expiry: {
    type: DataTypes.INTEGER(11),
    allowNull: false,
  },
  contexts: {
    type: DataTypes.STRING(200),
    allowNull: false,
  },
}, {
  tableName: 'luckperms_group_permissions',
});
