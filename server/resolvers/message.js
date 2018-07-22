import { withFilter } from 'graphql-subscriptions';
import requiresAuth, { MessageSubscription } from '../permissions';
import pubsub from '../pubsub';


const NEW_MESSAGE = 'NEW_MESSAGE ';

export default {
  Subscription: {
    newMessage: {
      subscribe: MessageSubscription.createResolver(withFilter(
        () => pubsub.asyncIterator(NEW_MESSAGE),
        (payload, args, { user }) => payload.teamId === args.teamId
            && ((payload.senderId === user.id && payload.receiverId === args.userId)
              || (payload.senderId === args.userId && payload.receiverId === user.id)),
      )),
    },
  },
  Message: {
    sender: ({ sender, senderId }, args, { models }) => {
      if (sender) {
        return sender;
      }

      return models.User.findOne({ where: { id: senderId } }, { raw: true });
    },
  },
  Query: {
    messages: async (parent, { teamId, otherUserId }, { models, user }) => models.Message.findAll(
      {
        order: [['created_at', 'ASC']],
        where: {
          teamId,
          [models.sequelize.Op.or]: [
            {
              [models.sequelize.Op.and]: [{ receiverId: otherUserId }, { senderId: user.id }],
            },
            {
              [models.sequelize.Op.and]: [{ receiverId: user.id }, { senderId: otherUserId }],
            },
          ],
        },
      },
      { raw: true },
    ),
  },
  Mutation: {
    createMessage: requiresAuth.createResolver(async (parent, args, { models, user }) => {
      try {
        const message = await models.Message.create({
          ...args,
          senderId: user.id,
        });

        pubsub.publish(NEW_MESSAGE, {
          teamId: args.teamId,
          senderId: user.id,
          receiverId: args.receiverId,
          newMessage: {
            ...message.dataValues,
            sender: {
              username: user.username,
            },
          },
        });

        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
    }),
  },
};
