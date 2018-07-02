export default (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    username: {
      type: DataTypes.STRING,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    phone: {
      type: DataTypes.INTEGER,
      unique: true,
    },
    lat: DataTypes.FLOAT,
    lng: DataTypes.FLOAT,
    picture: DataTypes.STRING,
    password: DataTypes.STRING,
  });

  User.associate = (models) => {
    User.belongsToMany(models.Team, {
      through: 'member',
      foreignKey: 'userId',
    });
  };

  return User;
};
