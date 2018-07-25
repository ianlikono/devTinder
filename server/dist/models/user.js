'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (sequelize, DataTypes) {
  var User = sequelize.define('user', {
    username: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isAlphanumeric: {
          args: true,
          msg: 'The Username Needs To Only Contain Letters And Numbers'
        },
        len: {
          args: [3, 10],
          msg: 'The Username Needs To Be Between 3 To 10 Characters Long'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: {
          args: true,
          msg: 'Please Enter A Valid Email'
        }
      }
    },
    location: {
      type: DataTypes.STRING,
      defaultValue: 'No Location Specified'
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [6, 100],
          msg: 'The password needs to be between 6 and 100 characters To Keep It Safe'
        }
      }
    }
  }, {
    hooks: {
      afterValidate: function () {
        var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(user) {
          var hashedPassword;
          return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return _bcrypt2.default.hash(user.password, 12);

                case 2:
                  hashedPassword = _context.sent;

                  // eslint-disable-next-line no-param-reassign
                  user.password = hashedPassword;

                case 4:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, undefined);
        }));

        return function afterValidate(_x) {
          return _ref.apply(this, arguments);
        };
      }(),
      beforeUpdate: function () {
        var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(user) {
          var updatedLocation;
          return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.next = 2;
                  return String(user.location);

                case 2:
                  updatedLocation = _context2.sent;

                  // eslint-disable-next-line no-param-reassign
                  user.location = updatedLocation;

                case 4:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2, undefined);
        }));

        return function beforeUpdate(_x2) {
          return _ref2.apply(this, arguments);
        };
      }()
    }
  });

  User.associate = function (models) {
    User.belongsToMany(models.Team, {
      through: models.Member,
      foreignKey: {
        name: 'userId',
        field: 'user_id'
      }
    });
  };

  return User;
};