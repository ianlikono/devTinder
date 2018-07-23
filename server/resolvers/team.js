import formatErrors from '../formatErrors';

export default {
  Query: {
    allUserTeams: (parent, args, { models, user }) => models.sequelize.query(
      `select teams.name, teams.id from members join teams on teams.id = members.team_id where user_id=${user.id}`,
      {
        model: models.Member,
        raw: true,
      },
    ),
    getUserId: (parent, args, { models, user }) => models.sequelize.query(
      `select user_id from members where team_id = ${args.teamId};`,
      {
        model: models.Member,
        raw: true,
      },
    ),
  },
  Mutation: {
    addTeamMember: async (parent, { username, teamId }, { models, user }) => {
      try {
        const memberPromise = models.Member.findOne(
          { where: { teamId, userId: user.id } },
          { raw: true },
        );
        const userToAddPromise = models.User.findOne({ where: { username } }, { raw: true });
        const [member, userToAdd] = await Promise.all([memberPromise, userToAddPromise]);
        if (!member.admin) {
          return {
            ok: false,
            errors: [{ path: 'username', message: 'Something Went Wrong Please Try Again' }],
          };
        }
        if (!userToAdd) {
          return {
            ok: false,
            errors: [{ path: 'username', message: 'Something Went Wrong Please Try Again' }],
          };
        }
        await models.Member.create({ userId: userToAdd.id, teamId });
        return {
          ok: true,
        };
      } catch (err) {
        console.log(err);
        return {
          ok: false,
          errors: formatErrors(err, models),
        };
      }
    },
    createTeam: async (parent, args, { models, user }) => {
      try {
        const response = await models.sequelize.transaction(async (transaction) => {
          const team = await models.Team.create({ ...args }, { transaction });
          await models.Member.create(
            { teamId: team.id, userId: user.id, admin: true },
            { transaction },
          );
          return team;
        });
        return {
          ok: true,
          team: response,
        };
      } catch (err) {
        // console.log(err);
        return {
          ok: false,
          errors: formatErrors(err, models),
        };
      }
    },
  },
};
