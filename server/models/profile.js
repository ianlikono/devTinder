export default (sequelize) => {
  const Profile = sequelize.define('profile', {});

  Profile.associate = (models) => {
    Profile.belongsTo(models.User, {
      foreignKey: {
        name: 'userId',
        field: 'user_id',
      },
    });
  };

  return Profile;
};
