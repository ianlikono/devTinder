'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _awsSdk = require('aws-sdk');

var _awsSdk2 = _interopRequireDefault(_awsSdk);

var _formatErrors = require('../formatErrors');

var _formatErrors2 = _interopRequireDefault(_formatErrors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var s3Bucket = process.env.s3Bucket;
exports.default = {
  Query: {
    getPic: function getPic(parent, _ref, _ref2) {
      var id = _ref.id;
      var models = _ref2.models;
      return models.Pic.findOne({ where: { id: id } });
    },
    getUserPics: function getUserPics(parent, args, _ref3) {
      var models = _ref3.models;
      return models.sequelize.query('select distinct url from pics where user_id= ' + args.userId + ' limit 4;', {
        model: models.Pic,
        raw: true
      });
    }
  },
  Mutation: {
    signS3: function () {
      var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(parent, _ref5) {
        var filename = _ref5.filename,
            filetype = _ref5.filetype;
        var s3, s3Params, signedRequest, url;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                s3 = new _awsSdk2.default.S3({
                  signatureVersion: 'v4',
                  region: 'us-east-2'
                });
                s3Params = {
                  Bucket: s3Bucket,
                  Key: filename,
                  Expires: 60,
                  ContentType: filetype,
                  ACL: 'public-read'
                };
                _context.next = 4;
                return s3.getSignedUrl('putObject', s3Params);

              case 4:
                signedRequest = _context.sent;
                url = 'https://' + s3Bucket + '.s3.amazonaws.com/' + filename;
                return _context.abrupt('return', {
                  signedRequest: signedRequest,
                  url: url
                });

              case 7:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, undefined);
      }));

      return function signS3(_x, _x2) {
        return _ref4.apply(this, arguments);
      };
    }(),
    createPic: function () {
      var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(parent, args, _ref7) {
        var models = _ref7.models,
            user = _ref7.user;
        var pic;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return models.Pic.create((0, _extends3.default)({}, args, { userId: user.id }));

              case 3:
                pic = _context2.sent;
                return _context2.abrupt('return', {
                  ok: true,
                  pic: pic
                });

              case 7:
                _context2.prev = 7;
                _context2.t0 = _context2['catch'](0);
                return _context2.abrupt('return', {
                  ok: false,
                  errors: (0, _formatErrors2.default)(_context2.t0)
                });

              case 10:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, undefined, [[0, 7]]);
      }));

      return function createPic(_x3, _x4, _x5) {
        return _ref6.apply(this, arguments);
      };
    }()
  }
};