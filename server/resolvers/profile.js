import formatErrors from '../formatErrors';

export default {
  Query: {
    // getProfile: (parent, { id }, { models, user }) => models.Pic.findAll({ where: { userId: user.id } }),
    // console.log(args.levelId),
    getProfileTopics: (parent, args, { models, user }) => models.sequelize.query(
      `select topics.name, topics.id from topics join profiles on profiles.topic_id = topics.id join users on users.id = profiles.user_id where users.id = ${
        user.id
      } and profiles.level_id=${args.levelId}`,
      {
        model: models.Topic,
        raw: true,
      },
    ),
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
