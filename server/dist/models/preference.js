'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = (sequelize, DataTypes) => {
  const Preference = sequelize.define('preference', {
    likes: {
      type: DataTypes.STRING
    },
    dislikes: {
      type: DataTypes.STRING
    }
  });

  Preference.associate = models => {
    Preference.belongsTo(models.User, {
      foreignKey: {
        name: 'userId',
        field: 'user_id'
      }
    });
  };

  return Preference;
};