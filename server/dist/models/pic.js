'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = (sequelize, DataTypes) => {
  const Pic = sequelize.define('pic', {
    url: DataTypes.STRING
  });

  Pic.associate = models => {
    Pic.belongsTo(models.User, {
      foreignKey: {
        name: 'userId',
        field: 'user_id'
      }
    });
  };
  return Pic;
};