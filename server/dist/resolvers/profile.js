'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _formatErrors = require('../formatErrors');

var _formatErrors2 = _interopRequireDefault(_formatErrors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  Query: {
    // getProfile: (parent, { id }, { models, user }) => models.Pic.findAll({ where: { userId: user.id } }),
    // console.log(args.levelId),
    getProfileTopics: (parent, args, { models, user }) => models.sequelize.query(`select topics.name, topics.id from topics join profiles on profiles.topic_id = topics.id join users on users.id = profiles.user_id where users.id = ${user.id} and profiles.level_id=${args.levelId}`, {
      model: models.Topic,
      raw: true
    })
  },
  Mutation: {
    createProfile: async (parent, args, { models, user }) => {
      try {
        const profile = await models.Profile.create(_extends({}, args, { userId: user.id }));
        return {
          ok: true,
          profile
        };
      } catch (err) {
        return {
          ok: false,
          errors: (0, _formatErrors2.default)(err)
        };
      }
    }
  }
};