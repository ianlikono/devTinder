'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize, DataTypes) {
  var Topic = sequelize.define('topic', {
    name: {
      type: DataTypes.STRING
    }
  });

  Topic.associate = function (models) {
    Topic.belongsToMany(models.Level, {
      through: models.Profile,
      foreignKey: {
        name: 'topicId',
        field: 'topic_id'
      }
    });
  };

  return Topic;
};