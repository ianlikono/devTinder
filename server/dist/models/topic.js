'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = (sequelize, DataTypes) => {
  const Topic = sequelize.define('topic', {
    name: {
      type: DataTypes.STRING
    }
  });

  Topic.associate = models => {
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