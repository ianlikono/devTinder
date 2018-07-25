'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _formatErrors = require('../formatErrors');

var _formatErrors2 = _interopRequireDefault(_formatErrors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  Query: {
    allTopics: function allTopics(parent, args, _ref) {
      var models = _ref.models;
      return models.Topic.findAll();
    }
  },
  Mutation: {
    createTopic: function createTopic(parent, args, _ref2) {
      var models = _ref2.models;

      try {
        var topic = models.Topic.create(args);
        return {
          ok: true,
          topic: topic
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