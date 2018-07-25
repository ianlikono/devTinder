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

    Match: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(parent, args, _ref2) {
        var models = _ref2.models,
            user = _ref2.user;
        var response, liked, i, TeamName;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return models.Preference.findAll({ where: { userId: args.userId } });

              case 2:
                response = _context2.sent;
                liked = [];

                for (i = 0; i < response.length; i++) {
                  if (response[i].dataValues.likes == user.id) {
                    liked.push(response[i].dataValues.likes);
                  }
                }

                if (!(liked.length > 0)) {
                  _context2.next = 9;
                  break;
                }

                TeamName = { name: 'scorpio' };
                _context2.next = 9;
                return models.sequelize.transaction(function () {
                  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(transaction) {
                    var team;
                    return _regenerator2.default.wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            _context.next = 2;
                            return models.Team.create((0, _extends3.default)({}, TeamName), { transaction: transaction });

                          case 2:
                            team = _context.sent;
                            _context.next = 5;
                            return models.Member.create({ teamId: team.id, userId: user.id, admin: true }, { transaction: transaction });

                          case 5:
                            _context.next = 7;
                            return models.Member.create({ userId: args.userId, teamId: team.id }, { transaction: transaction });

                          case 7:
                            return _context.abrupt('return', team);

                          case 8:
                          case 'end':
                            return _context.stop();
                        }
                      }
                    }, _callee, undefined);
                  }));

                  return function (_x4) {
                    return _ref3.apply(this, arguments);
                  };
                }());

              case 9:
                return _context2.abrupt('return', liked.length > 0 && true);

              case 10:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, undefined);
      }));

      return function Match(_x, _x2, _x3) {
        return _ref.apply(this, arguments);
      };
    }()

  },
  Mutation: {
    // eslint-disbale
    likeUser: function () {
      var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(parent, args, _ref5) {
        var models = _ref5.models,
            user = _ref5.user;
        var like;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return models.Preference.create((0, _extends3.default)({}, args, { userId: user.id }));

              case 3:
                like = _context3.sent;
                return _context3.abrupt('return', {
                  ok: true,
                  like: like
                });

              case 7:
                _context3.prev = 7;
                _context3.t0 = _context3['catch'](0);
                return _context3.abrupt('return', {
                  ok: false,
                  errors: (0, _formatErrors2.default)(_context3.t0)
                });

              case 10:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, undefined, [[0, 7]]);
      }));

      return function likeUser(_x5, _x6, _x7) {
        return _ref4.apply(this, arguments);
      };
    }(),
    disLikeUser: function () {
      var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(parent, args, _ref7) {
        var models = _ref7.models,
            user = _ref7.user;
        var like;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                _context4.next = 3;
                return models.Preference.create((0, _extends3.default)({}, args, { userId: user.id }));

              case 3:
                like = _context4.sent;
                return _context4.abrupt('return', {
                  ok: true,
                  like: like
                });

              case 7:
                _context4.prev = 7;
                _context4.t0 = _context4['catch'](0);
                return _context4.abrupt('return', {
                  ok: false,
                  errors: (0, _formatErrors2.default)(_context4.t0)
                });

              case 10:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, undefined, [[0, 7]]);
      }));

      return function disLikeUser(_x8, _x9, _x10) {
        return _ref6.apply(this, arguments);
      };
    }()
  }
};