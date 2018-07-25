import { tryLogin } from '../auth';
import formatErrors from '../formatErrors';

export default {
  Query: {
    getUser: (parent, { id }, { models }) => models.User.findOne({ where: { id } }),
    allUsers: (parent, args, { models }) => models.User.findAll(),
    countAllUsers: (parent, args, { models }) => models.sequelize.query('select count(id) from users', {
      model: models.User,
      raw: true,
    }),
    // eslint-disable-next-line
    getUsersToMatch: (parent, args, { models }) => models.sequelize.query("select users.username, users.location from users where location = '" + args.location +"'", {
      model: models.User,
      raw: true,
    }),
  },
  Mutation: {
    login: (parent, { email, password }, { models, SECRET, SECRET2 }) => tryLogin(email, password, models, SECRET, SECRET2),
    register: async (parent, args, { models }) => {
      try {
        const user = await models.User.create(args);
        return {
          ok: true,
          user,
        };
      } catch (err) {
        return {
          ok: false,
          errors: formatErrors(err, models),
        };
      }
    },
    // eslint-disable-next-line
    updateLocation: (parent, args, { models, user }) => models.sequelize.query("update users set location = '" +  args.location  + "' where id = "  + user.id , {
      model: models.User,
      raw: true,
    }),
  },
  User: {
    pics: ({ id }, args, { models }) => models.Pic.findAll({ where: { userId: id } }),
    expert: (parent, args, { models }) => models.sequelize.query(
      `select topics.name, topics.id from topics join profiles on profiles.topic_id = topics.id join users on users.id = profiles.user_id where users.id = ${
        parent.id
      } and profiles.level_id = 3`,
      {
        model: models.Topic,
        raw: true,
      },
    ),
    intermediate: (parent, args, { models }) => models.sequelize.query(
      `select topics.name, topics.id from topics join profiles on profiles.topic_id = topics.id join users on users.id = profiles.user_id where users.id = ${
        parent.id
      } and profiles.level_id = 2`,
      {
        model: models.Topic,
        raw: true,
      },
    ),
    beginner: (parent, args, { models }) => models.sequelize.query(
      `select topics.name, topics.id from topics join profiles on profiles.topic_id = topics.id join users on users.id = profiles.user_id where users.id = ${
        parent.id
      } and profiles.level_id = 1`,
      {
        model: models.Topic,
        raw: true,
      },
    ),
  },
};
