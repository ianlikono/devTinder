'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _auth = require('../auth');

var _formatErrors = require('../formatErrors');

var _formatErrors2 = _interopRequireDefault(_formatErrors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  Query: {
    getUser: function getUser(parent, _ref, _ref2) {
      var id = _ref.id;
      var models = _ref2.models;
      return models.User.findOne({ where: { id: id } });
    },
    allUsers: function allUsers(parent, args, _ref3) {
      var models = _ref3.models;
      return models.User.findAll();
    },
    countAllUsers: function countAllUsers(parent, args, _ref4) {
      var models = _ref4.models;
      return models.sequelize.query('select count(id) from users', {
        model: models.User,
        raw: true
      });
    },
    // eslint-disable-next-line
    getUsersToMatch: function getUsersToMatch(parent, args, _ref5) {
      var models = _ref5.models;
      return models.sequelize.query("select users.username, users.location from users where location = '" + args.location + "'", {
        model: models.User,
        raw: true
      });
    }
  },
  Mutation: {
    login: function login(parent, _ref6, _ref7) {
      var email = _ref6.email,
          password = _ref6.password;
      var models = _ref7.models,
          SECRET = _ref7.SECRET,
          SECRET2 = _ref7.SECRET2;
      return (0, _auth.tryLogin)(email, password, models, SECRET, SECRET2);
    },
    register: function () {
      var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(parent, args, _ref9) {
        var models = _ref9.models;
        var user;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return models.User.create(args);

              case 3:
                user = _context.sent;
                return _context.abrupt('return', {
                  ok: true,
                  user: user
                });

              case 7:
                _context.prev = 7;
                _context.t0 = _context['catch'](0);
                return _context.abrupt('return', {
                  ok: false,
                  errors: (0, _formatErrors2.default)(_context.t0, models)
                });

              case 10:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, undefined, [[0, 7]]);
      }));

      return function register(_x, _x2, _x3) {
        return _ref8.apply(this, arguments);
      };
    }(),
    // eslint-disable-next-line
    updateLocation: function updateLocation(parent, args, _ref10) {
      var models = _ref10.models,
          user = _ref10.user;
      return models.sequelize.query("update users set location = '" + args.location + "' where id = " + user.id, {
        model: models.User,
        raw: true
      });
    }
  },
  User: {
    pics: function pics(_ref11, args, _ref12) {
      var id = _ref11.id;
      var models = _ref12.models;
      return models.Pic.findAll({ where: { userId: id } });
    },
    expert: function expert(parent, args, _ref13) {
      var models = _ref13.models;
      return models.sequelize.query('select topics.name, topics.id from topics join profiles on profiles.topic_id = topics.id join users on users.id = profiles.user_id where users.id = ' + parent.id + ' and profiles.level_id = 3', {
        model: models.Topic,
        raw: true
      });
    },
    intermediate: function intermediate(parent, args, _ref14) {
      var models = _ref14.models;
      return models.sequelize.query('select topics.name, topics.id from topics join profiles on profiles.topic_id = topics.id join users on users.id = profiles.user_id where users.id = ' + parent.id + ' and profiles.level_id = 2', {
        model: models.Topic,
        raw: true
      });
    },
    beginner: function beginner(parent, args, _ref15) {
      var models = _ref15.models;
      return models.sequelize.query('select topics.name, topics.id from topics join profiles on profiles.topic_id = topics.id join users on users.id = profiles.user_id where users.id = ' + parent.id + ' and profiles.level_id = 1', {
        model: models.Topic,
        raw: true
      });
    }
  }
};