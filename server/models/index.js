import Sequelize from 'sequelize';

require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    dialect: 'postgres',
    operatorsAliases: Sequelize.Op,
    define: { underscored: true },
  },
);

const models = {
  User: sequelize.import('./user'),
  //   Member: sequelize.import('./member'),
  Team: sequelize.import('./team'),
  //   Topic: sequelize.import('./topic'),
  //   UserLikes: sequelize.import('./userLikes'),
  //   userDislikes: sequelize.import('./userDislikes'),
};

Object.keys(models).forEach((modelName) => {
  if ('associate' in models[modelName]) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models;
