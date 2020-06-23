module.exports = (sequelize, DataTypes) => sequelize.define('luckperms_actions', {
  id: {
    type: DataTypes.INTEGER(11),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  time: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  actor_uuid: {
    type: DataTypes.STRING(36),
    allowNull: false,
  },
  actor_name: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  type: {
    type: DataTypes.CHAR(1),
    allowNull: false,
  },
  acted_uuid: {
    type: DataTypes.STRING(36),
    allowNull: false,
  },
  acted_name: {
    type: DataTypes.STRING(36),
    allowNull: false,
  },
  action: {
    type: DataTypes.STRING(300),
    allowNull: true,
  },
}, {
  tableName: 'luckperms_actions',
});
