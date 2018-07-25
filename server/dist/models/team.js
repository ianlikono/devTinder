'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize, DataTypes) {
  var Team = sequelize.define('team', {
    name: {
      type: DataTypes.STRING
    }
  });

  Team.associate = function (models) {
    Team.belongsToMany(models.User, {
      through: models.Member,
      foreignKey: {
        name: 'teamId',
        field: 'team_id'
      }
    });
  };

  return Team;
};