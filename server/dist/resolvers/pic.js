'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _awsSdk = require('aws-sdk');

var _awsSdk2 = _interopRequireDefault(_awsSdk);

var _formatErrors = require('../formatErrors');

var _formatErrors2 = _interopRequireDefault(_formatErrors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const { s3Bucket } = process.env;

exports.default = {
  Query: {
    getPic: (parent, { id }, { models }) => models.Pic.findOne({ where: { id } }),
    getUserPics: (parent, args, { models }) => models.sequelize.query(`select distinct url from pics where user_id= ${args.userId} limit 4;`, {
      model: models.Pic,
      raw: true
    })
  },
  Mutation: {
    signS3: async (parent, { filename, filetype }) => {
      const s3 = new _awsSdk2.default.S3({
        signatureVersion: 'v4',
        region: 'us-east-2'
      });

      const s3Params = {
        Bucket: s3Bucket,
        Key: filename,
        Expires: 60,
        ContentType: filetype,
        ACL: 'public-read'
      };

      const signedRequest = await s3.getSignedUrl('putObject', s3Params);
      const url = `https://${s3Bucket}.s3.amazonaws.com/${filename}`;
      return {
        signedRequest,
        url
      };
    },
    createPic: async (parent, args, { models, user }) => {
      try {
        const pic = await models.Pic.create(_extends({}, args, { userId: user.id }));
        return {
          ok: true,
          pic
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