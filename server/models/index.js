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
  Team: sequelize.import('./team'),
  Topic: sequelize.import('./topic'),
  Profile: sequelize.import('./profile'),
  Pic: sequelize.import('./pic'),
  Message: sequelize.import('./message'),
  Member: sequelize.import('./member'),
  Level: sequelize.import('./level'),
};

Object.keys(models).forEach((modelName) => {
  if ('associate' in models[modelName]) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models;
