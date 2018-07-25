'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _formatErrors = require('../formatErrors');

var _formatErrors2 = _interopRequireDefault(_formatErrors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  Query: {
    // getProfile: (parent, { id }, { models, user }) => models.Pic.findAll({ where: { userId: user.id } }),
    // console.log(args.levelId),
    getProfileTopics: function getProfileTopics(parent, args, _ref) {
      var models = _ref.models,
          user = _ref.user;
      return models.sequelize.query('select topics.name, topics.id from topics join profiles on profiles.topic_id = topics.id join users on users.id = profiles.user_id where users.id = ' + user.id + ' and profiles.level_id=' + args.levelId, {
        model: models.Topic,
        raw: true
      });
    }
  },
  Mutation: {
    createProfile: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(parent, args, _ref3) {
        var models = _ref3.models,
            user = _ref3.user;
        var profile;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return models.Profile.create((0, _extends3.default)({}, args, { userId: user.id }));

              case 3:
                profile = _context.sent;
                return _context.abrupt('return', {
                  ok: true,
                  profile: profile
                });

              case 7:
                _context.prev = 7;
                _context.t0 = _context['catch'](0);
                return _context.abrupt('return', {
                  ok: false,
                  errors: (0, _formatErrors2.default)(_context.t0)
                });

              case 10:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, undefined, [[0, 7]]);
      }));

      return function createProfile(_x, _x2, _x3) {
        return _ref2.apply(this, arguments);
      };
    }()
  }
};