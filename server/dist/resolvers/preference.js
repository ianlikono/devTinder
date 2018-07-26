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

    Match: async (parent, args, { models, user }) => {
      const response = await models.Preference.findAll({ where: { userId: args.userId } });
      const liked = [];
      for (let i = 0; i < response.length; i++) {
        if (response[i].dataValues.likes == user.id) {
          liked.push(response[i].dataValues.likes);
        }
      }
      if (liked.length > 0) {
        const TeamName = { name: 'scorpio' };
        await models.sequelize.transaction(async transaction => {
          const team = await models.Team.create(_extends({}, TeamName), { transaction });
          await models.Member.create({ teamId: team.id, userId: user.id, admin: true }, { transaction });
          await models.Member.create({ userId: args.userId, teamId: team.id }, { transaction });
          return team;
        });
      }
      return liked.length > 0 && true;
    }

  },
  Mutation: {
    // eslint-disbale
    likeUser: async (parent, args, { models, user }) => {
      try {
        const like = await models.Preference.create(_extends({}, args, { userId: user.id }));
        return {
          ok: true,
          like
        };
      } catch (err) {
        return {
          ok: false,
          errors: (0, _formatErrors2.default)(err)
        };
      }
    },
    disLikeUser: async (parent, args, { models, user }) => {
      try {
        const like = await models.Preference.create(_extends({}, args, { userId: user.id }));
        return {
          ok: true,
          like
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