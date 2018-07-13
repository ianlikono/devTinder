import formatErrors from '../formatErrors';

export default {
  Query: {
    // getProfile: (parent, { id }, { models, user }) => models.Pic.findAll({ where: { userId: user.id } }),
  },
  Mutation: {
    createProfile: async (parent, args, { models, user }) => {
      try {
        const profile = await models.Profile.create({ ...args, userId: user.id });
        return {
          ok: true,
          profile,
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
