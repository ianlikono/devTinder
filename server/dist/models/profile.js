'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize) {
  var Profile = sequelize.define('profile', {});

  Profile.associate = function (models) {
    Profile.belongsTo(models.User, {
      foreignKey: {
        name: 'userId',
        field: 'user_id'
      }
    });
  };

  return Profile;
};