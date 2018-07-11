export default (sequelize, DataTypes) => {
  const Pic = sequelize.define('message', {
    url: DataTypes.STRING,
  });

  Pic.associate = (models) => {
    Pic.belongsTo(models.User, {
      foreignKey: {
        name: 'userId',
        field: 'user_id',
      },
    });
  };
  return Pic;
};
