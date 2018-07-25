'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize, DataTypes) {
  var Level = sequelize.define('level', {
    name: {
      type: DataTypes.STRING
    }
  });

  Level.associate = function (models) {
    Level.belongsToMany(models.Topic, {
      through: models.Profile,
      foreignKey: {
        name: 'levelId',
        field: 'level_id'
      }
    });
  };

  return Level;
};