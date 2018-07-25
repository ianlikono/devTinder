export default (sequelize, DataTypes) => {
  const Level = sequelize.define('level', {
    name: {
      type: DataTypes.STRING,
    },
  });

  Level.associate = (models) => {
    Level.belongsToMany(models.Topic, {
      through: models.Profile,
      foreignKey: {
        name: 'levelId',
        field: 'level_id',
      },
    });
  };

  return Level;
};
