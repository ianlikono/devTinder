import formatErrors from '../formatErrors';

export default {
  Query: {
    allTopics: (parent, args, { models }) => models.Topic.findAll(),
  },
  Mutation: {
    createTopic: (parent, args, { models }) => {
      try {
        const topic = models.Topic.create(args);
        return {
          ok: true,
          topic,
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
