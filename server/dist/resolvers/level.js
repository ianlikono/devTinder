'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _formatErrors = require('../formatErrors');

var _formatErrors2 = _interopRequireDefault(_formatErrors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  Query: {
    allLevels: (parent, args, { models }) => models.Level.findAll(),
    getLevel: (parent, { id }, { models }) => models.Level.findOne({ where: { id } })
  },
  Mutation: {
    createLevel: (parent, args, { models }) => {
      try {
        const level = models.Level.create(args);
        return {
          ok: true,
          level
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