'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _graphqlSubscriptions = require('graphql-subscriptions');

var _permissions = require('../permissions');

var _permissions2 = _interopRequireDefault(_permissions);

var _pubsub = require('../pubsub');

var _pubsub2 = _interopRequireDefault(_pubsub);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const NEW_MESSAGE = 'NEW_MESSAGE ';

exports.default = {
  Subscription: {
    newMessage: {
      subscribe: _permissions.MessageSubscription.createResolver((0, _graphqlSubscriptions.withFilter)(() => _pubsub2.default.asyncIterator(NEW_MESSAGE), (payload, args, { user }) => payload.teamId === args.teamId && (payload.senderId === user.id && payload.receiverId === args.userId || payload.senderId === args.userId && payload.receiverId === user.id)))
    }
  },
  Message: {
    sender: ({ sender, senderId }, args, { models }) => {
      if (sender) {
        return sender;
      }

      return models.User.findOne({ where: { id: senderId } }, { raw: true });
    }
  },
  Query: {
    messages: async (parent, { teamId, otherUserId }, { models, user }) => models.Message.findAll({
      order: [['created_at', 'ASC']],
      where: {
        teamId,
        [models.sequelize.Op.or]: [{
          [models.sequelize.Op.and]: [{ receiverId: otherUserId }, { senderId: user.id }]
        }, {
          [models.sequelize.Op.and]: [{ receiverId: user.id }, { senderId: otherUserId }]
        }]
      }
    }, { raw: true })
  },
  Mutation: {
    createMessage: _permissions2.default.createResolver(async (parent, args, { models, user }) => {
      try {
        const message = await models.Message.create(_extends({}, args, {
          senderId: user.id
        }));

        _pubsub2.default.publish(NEW_MESSAGE, {
          teamId: args.teamId,
          senderId: user.id,
          receiverId: args.receiverId,
          newMessage: _extends({}, message.dataValues, {
            sender: {
              username: user.username
            }
          })
        });

        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
    })
  }
};