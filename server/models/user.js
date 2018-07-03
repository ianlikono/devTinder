export default (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
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
    phone: {
      type: DataTypes.INTEGER,
      unique: true,
      validate: {
        isNumeric: {
          args: true,
          msg: 'Please Enter A Valid Mobile Number Only Containing Numbers',
        },
      },
    },
    lat: DataTypes.FLOAT,
    lng: DataTypes.FLOAT,
    picture: DataTypes.STRING,
    password: DataTypes.STRING,
    // password: {
    //   type: DataTypes.STRING,
    //   validate: {
    //     args: [6, 100],
    //     msg: 'The Password Needs To Be Between 6 and 100 characters to keep it safe',
    //   },
    // },
  });

  User.associate = (models) => {
    User.belongsToMany(models.Team, {
      through: 'member',
      foreignKey: {
        name: 'userId',
        field: 'user_id',
      },
    });
  };

  return User;
};
