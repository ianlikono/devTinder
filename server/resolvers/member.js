import formatErrors from '../formatErrors';

export default {
  Query: {
    // getProfile: (parent, { id }, { models, user }) => models.Pic.findAll({ where: { userId: user.id } }),
  },
  Mutation: {
    addMember: async (parent, args, { models, user }) => {
      try {
        const response = await models.sequelize.transaction(async () => {
          const team = await models.Team.create({ name: user.id });
          await models.Member.create({ teamId: team.id, userId: user.id });
          return team;
        });
        return {
          ok: true,
          team: response,
        };
      } catch (err) {
        return {
          ok: false,
          errors: formatErrors(err),
        };
      }
    },
  },
};
