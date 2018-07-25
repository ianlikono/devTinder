'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize, DataTypes) {
  var Preference = sequelize.define('preference', {
    likes: {
      type: DataTypes.STRING
    },
    dislikes: {
      type: DataTypes.STRING
    }
  });

  Preference.associate = function (models) {
    Preference.belongsTo(models.User, {
      foreignKey: {
        name: 'userId',
        field: 'user_id'
      }
    });
  };

  return Preference;
};