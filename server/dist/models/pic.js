'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize, DataTypes) {
  var Pic = sequelize.define('pic', {
    url: DataTypes.STRING
  });

  Pic.associate = function (models) {
    Pic.belongsTo(models.User, {
      foreignKey: {
        name: 'userId',
        field: 'user_id'
      }
    });
  };
  return Pic;
};