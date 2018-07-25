'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _formatErrors = require('../formatErrors');

var _formatErrors2 = _interopRequireDefault(_formatErrors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  Query: {
    allUserTeams: function allUserTeams(parent, args, _ref) {
      var models = _ref.models,
          user = _ref.user;
      return models.sequelize.query('select teams.name, teams.id from members join teams on teams.id = members.team_id where user_id=' + user.id, {
        model: models.Member,
        raw: true
      });
    },
    getUserId: function getUserId(parent, args, _ref2) {
      var models = _ref2.models,
          user = _ref2.user;
      return models.sequelize.query('select user_id from members where team_id = ' + args.teamId + ';', {
        model: models.Member,
        raw: true
      });
    }
  },
  Mutation: {
    addTeamMember: function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(parent, _ref4, _ref5) {
        var username = _ref4.username,
            teamId = _ref4.teamId;
        var models = _ref5.models,
            user = _ref5.user;

        var memberPromise, userToAddPromise, _ref6, _ref7, member, userToAdd;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                memberPromise = models.Member.findOne({ where: { teamId: teamId, userId: user.id } }, { raw: true });
                userToAddPromise = models.User.findOne({ where: { username: username } }, { raw: true });
                _context.next = 5;
                return _promise2.default.all([memberPromise, userToAddPromise]);

              case 5:
                _ref6 = _context.sent;
                _ref7 = (0, _slicedToArray3.default)(_ref6, 2);
                member = _ref7[0];
                userToAdd = _ref7[1];

                if (member.admin) {
                  _context.next = 11;
                  break;
                }

                return _context.abrupt('return', {
                  ok: false,
                  errors: [{ path: 'username', message: 'Something Went Wrong Please Try Again' }]
                });

              case 11:
                if (userToAdd) {
                  _context.next = 13;
                  break;
                }

                return _context.abrupt('return', {
                  ok: false,
                  errors: [{ path: 'username', message: 'Something Went Wrong Please Try Again' }]
                });

              case 13:
                _context.next = 15;
                return models.Member.create({ userId: userToAdd.id, teamId: teamId });

              case 15:
                return _context.abrupt('return', {
                  ok: true
                });

              case 18:
                _context.prev = 18;
                _context.t0 = _context['catch'](0);

                console.log(_context.t0);
                return _context.abrupt('return', {
                  ok: false,
                  errors: (0, _formatErrors2.default)(_context.t0, models)
                });

              case 22:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, undefined, [[0, 18]]);
      }));

      return function addTeamMember(_x, _x2, _x3) {
        return _ref3.apply(this, arguments);
      };
    }(),
    createTeam: function () {
      var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(parent, args, _ref9) {
        var models = _ref9.models,
            user = _ref9.user;
        var response;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return models.sequelize.transaction(function () {
                  var _ref10 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(transaction) {
                    var team;
                    return _regenerator2.default.wrap(function _callee2$(_context2) {
                      while (1) {
                        switch (_context2.prev = _context2.next) {
                          case 0:
                            _context2.next = 2;
                            return models.Team.create((0, _extends3.default)({}, args), { transaction: transaction });

                          case 2:
                            team = _context2.sent;
                            _context2.next = 5;
                            return models.Member.create({ teamId: team.id, userId: user.id, admin: true }, { transaction: transaction });

                          case 5:
                            return _context2.abrupt('return', team);

                          case 6:
                          case 'end':
                            return _context2.stop();
                        }
                      }
                    }, _callee2, undefined);
                  }));

                  return function (_x7) {
                    return _ref10.apply(this, arguments);
                  };
                }());

              case 3:
                response = _context3.sent;
                return _context3.abrupt('return', {
                  ok: true,
                  team: response
                });

              case 7:
                _context3.prev = 7;
                _context3.t0 = _context3['catch'](0);
                return _context3.abrupt('return', {
                  ok: false,
                  errors: (0, _formatErrors2.default)(_context3.t0, models)
                });

              case 10:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, undefined, [[0, 7]]);
      }));

      return function createTeam(_x4, _x5, _x6) {
        return _ref8.apply(this, arguments);
      };
    }()
  }
};