import bcrypt from 'bcrypt';

export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    'user',
    {
      username: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          isAlphanumeric: {
            args: true,
            msg: 'The Username Needs To Only Contain Letters And Numbers',
          },
          len: {
            args: [3, 10],
            msg: 'The Username Needs To Be Between 3 To 10 Characters Long',
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          isEmail: {
            args: true,
            msg: 'Please Enter A Valid Email',
          },
        },
      },
      location: {
        type: DataTypes.STRING,
        defaultValue: 'No Location Specified',
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          len: {
            args: [6, 100],
            msg: 'The password needs to be between 6 and 100 characters To Keep It Safe',
          },
        },
      },
    },
    {
      hooks: {
        afterValidate: async (user) => {
          const hashedPassword = await bcrypt.hash(user.password, 12);
          // eslint-disable-next-line no-param-reassign
          user.password = hashedPassword;
        },
        beforeUpdate: async (user) => {
          const updatedLocation = await String(user.location);
          // eslint-disable-next-line no-param-reassign
          user.location = updatedLocation;
        },
      },
    },
  );

  User.associate = (models) => {
    User.belongsToMany(models.Team, {
      through: models.Member,
      foreignKey: {
        name: 'userId',
        field: 'user_id',
      },
    });
  };

  return User;
};
