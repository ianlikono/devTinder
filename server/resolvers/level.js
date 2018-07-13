import formatErrors from '../formatErrors';

export default {
  // Query: {
  //   getUser: (parent, { id }, { models }) => models.Topic.findOne({ where: { id } }),
  //   allTopics: (parent, args, { models }) => models.Topic.findAll(),
  // },
  Mutation: {
    createLevel: (parent, args, { models }) => {
      try {
        const level = models.Level.create(args);
        return {
          ok: true,
          level,
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
