'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _formatErrors = require('../formatErrors');

var _formatErrors2 = _interopRequireDefault(_formatErrors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  Query: {
    allLevels: function allLevels(parent, args, _ref) {
      var models = _ref.models;
      return models.Level.findAll();
    },
    getLevel: function getLevel(parent, _ref2, _ref3) {
      var id = _ref2.id;
      var models = _ref3.models;
      return models.Level.findOne({ where: { id: id } });
    }
  },
  Mutation: {
    createLevel: function createLevel(parent, args, _ref4) {
      var models = _ref4.models;

      try {
        var level = models.Level.create(args);
        return {
          ok: true,
          level: level
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