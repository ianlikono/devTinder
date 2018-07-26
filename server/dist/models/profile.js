'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = sequelize => {
  const Profile = sequelize.define('profile', {});

  Profile.associate = models => {
    Profile.belongsTo(models.User, {
      foreignKey: {
        name: 'userId',
        field: 'user_id'
      }
    });
  };

  return Profile;
};