import formatErrors from '../formatErrors';

export default {
  Query: {
    allLevels: (parent, args, { models }) => models.Level.findAll(),
    getLevel: (parent, { id }, { models }) => models.Level.findOne({ where: { id } }),
  },
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
