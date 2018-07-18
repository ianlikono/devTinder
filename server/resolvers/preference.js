import formatErrors from '../formatErrors';

export default {
  Query: {
    // Match: (parent, args, { models, user }) => models.sequelize.query(
    //   `select topics.name, topics.id from topics join profiles on profiles.topic_id = topics.id join users on users.id = profiles.user_id where users.id = ${
    //     user.id
    //   } and profiles.level_id = ${args.levelId}`,
    //   {
    //     model: models.Topic,
    //     raw: true,
    //   },
    // ),
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
