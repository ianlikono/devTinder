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
    allUserTeams: (parent, args, { models, user }) => models.sequelize.query(`select teams.name, teams.id from members join teams on teams.id = members.team_id where user_id=${user.id}`, {
      model: models.Member,
      raw: true
    }),
    getUserId: (parent, args, { models, user }) => models.sequelize.query(`select user_id from members where team_id = ${args.teamId};`, {
      model: models.Member,
      raw: true
    })
  },
  Mutation: {
    addTeamMember: async (parent, { username, teamId }, { models, user }) => {
      try {
        const memberPromise = models.Member.findOne({ where: { teamId, userId: user.id } }, { raw: true });
        const userToAddPromise = models.User.findOne({ where: { username } }, { raw: true });
        const [member, userToAdd] = await Promise.all([memberPromise, userToAddPromise]);
        if (!member.admin) {
          return {
            ok: false,
            errors: [{ path: 'username', message: 'Something Went Wrong Please Try Again' }]
          };
        }
        if (!userToAdd) {
          return {
            ok: false,
            errors: [{ path: 'username', message: 'Something Went Wrong Please Try Again' }]
          };
        }
        await models.Member.create({ userId: userToAdd.id, teamId });
        return {
          ok: true
        };
      } catch (err) {
        console.log(err);
        return {
          ok: false,
          errors: (0, _formatErrors2.default)(err, models)
        };
      }
    },
    createTeam: async (parent, args, { models, user }) => {
      try {
        const response = await models.sequelize.transaction(async transaction => {
          const team = await models.Team.create(_extends({}, args), { transaction });
          await models.Member.create({ teamId: team.id, userId: user.id, admin: true }, { transaction });
          return team;
        });
        return {
          ok: true,
          team: response
        };
      } catch (err) {
        // console.log(err);
        return {
          ok: false,
          errors: (0, _formatErrors2.default)(err, models)
        };
      }
    }
  }
};