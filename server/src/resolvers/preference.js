import formatErrors from '../formatErrors';

export default {
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
        await models.sequelize.transaction(async (transaction) => {
          const team = await models.Team.create({ ...TeamName }, { transaction });
          await models.Member.create(
            { teamId: team.id, userId: user.id, admin: true },
            { transaction },
          );
          await models.Member.create({ userId: args.userId, teamId: team.id }, { transaction });
          return team;
        });
      }
      return liked.length > 0 && true;
    },

  },
  Mutation: {
    // eslint-disbale
    likeUser: async (parent, args, { models, user }) => {
      try {
        const like = await models.Preference.create({ ...args, userId: user.id });
        return {
          ok: true,
          like,
        };
      } catch (err) {
        return {
          ok: false,
          errors: formatErrors(err),
        };
      }
    },
    disLikeUser: async (parent, args, { models, user }) => {
      try {
        const like = await models.Preference.create({ ...args, userId: user.id });
        return {
          ok: true,
          like,
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
