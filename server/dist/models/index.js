'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('dotenv').config();

var sequelize = new _sequelize2.default(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  dialect: 'postgres',
  operatorsAliases: _sequelize2.default.Op,
  define: { underscored: true }
});

var models = {
  User: sequelize.import('./user'),
  Team: sequelize.import('./team'),
  Topic: sequelize.import('./topic'),
  Profile: sequelize.import('./profile'),
  Pic: sequelize.import('./pic'),
  Message: sequelize.import('./message'),
  Member: sequelize.import('./member'),
  Level: sequelize.import('./level'),
  Preference: sequelize.import('./preference')
};

(0, _keys2.default)(models).forEach(function (modelName) {
  if ('associate' in models[modelName]) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = _sequelize2.default;

exports.default = models;