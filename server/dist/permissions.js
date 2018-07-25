'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MessageSubscription = undefined;

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createResolver = function createResolver(resolver) {
  var baseResolver = resolver;
  baseResolver.createResolver = function (childResolver) {
    var newResolver = function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(parent, args, context, info) {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return resolver(parent, args, context, info);

              case 2:
                return _context.abrupt('return', childResolver(parent, args, context, info));

              case 3:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, undefined);
      }));

      return function newResolver(_x, _x2, _x3, _x4) {
        return _ref.apply(this, arguments);
      };
    }();
    return createResolver(newResolver);
  };
  return baseResolver;
};

// requiresAuth
exports.default = createResolver(function (parent, args, _ref2) {
  var user = _ref2.user;

  if (!user || !user.id) {
    throw new Error('Not authenticated');
  }
});
var MessageSubscription = exports.MessageSubscription = createResolver(function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(parent, _ref4, _ref5) {
    var teamId = _ref4.teamId,
        userId = _ref4.userId;
    var user = _ref5.user,
        models = _ref5.models;
    var members;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!(!user || !user.id)) {
              _context2.next = 2;
              break;
            }

            throw new Error('Not authenticated');

          case 2:
            _context2.next = 4;
            return models.Member.findAll({
              where: (0, _defineProperty3.default)({
                teamId: teamId
              }, models.sequelize.Op.or, [{ userId: userId }, { userId: user.id }])
            });

          case 4:
            members = _context2.sent;

            if (!(members.length !== 2)) {
              _context2.next = 7;
              break;
            }

            throw new Error('Something went wrong');

          case 7:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function (_x5, _x6, _x7) {
    return _ref3.apply(this, arguments);
  };
}());

// const createResolver = (resolver) => {
//     const baseResolver = resolver;
//     baseResolver.createResolver = (childResolver) => {
//       const newResolver = async (parent, args, context, info) => {
//         await resolver(parent, args, context, info);
//         return childResolver(parent, args, context, info);
//       };
//       return createResolver(newResolver);
//     };
//     return baseResolver;
//   };

//   export const requiresAuth = createResolver((parent, args, context) => {
//     if (!context.user || !context.user.id) {
//       throw new Error('Not authenticated');
//     }
//   });

//   export const requiresAdmin = requiresAuth.createResolver((parent, args, context) => {
//     if (!context.user.isAdmin) {
//       throw new Error('Requires admin access');
//     }
//   });