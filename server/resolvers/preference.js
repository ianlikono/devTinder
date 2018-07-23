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
