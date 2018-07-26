'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _formatErrors = require('../formatErrors');

var _formatErrors2 = _interopRequireDefault(_formatErrors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  Query: {
    allTopics: (parent, args, { models }) => models.Topic.findAll()
  },
  Mutation: {
    createTopic: (parent, args, { models }) => {
      try {
        const topic = models.Topic.create(args);
        return {
          ok: true,
          topic
        };
      } catch (err) {
        return {
          ok: false,
          errors: (0, _formatErrors2.default)(err)
        };
      }
    }
  }
};