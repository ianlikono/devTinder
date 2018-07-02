export default {
  // Query: {
  //   getUser: (parent, { id }, { models }) => models.Topic.findOne({ where: { id } }),
  //   allTopics: (parent, args, { models }) => models.Topic.findAll(),
  // },
  Mutation: {
    createTopic: (parent, args, { models }) => models.Topic.create(args),
  },
};
