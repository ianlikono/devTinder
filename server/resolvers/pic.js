import aws from 'aws-sdk';
import formatErrors from '../formatErrors';

const { s3Bucket } = process.env;

export default {
  Query: {
    getPic: (parent, { id }, { models }) => models.Pic.findOne({ where: { id } }),
    getUserPics: (parent, args, { models }) => models.sequelize.query(`select distinct url from pics where user_id= ${args.userId} limit 4;`,
      {
        model: models.Pic,
        raw: true,
      }),
  },
  Mutation: {
    signS3: async (parent, { filename, filetype }) => {
      const s3 = new aws.S3({
        signatureVersion: 'v4',
        region: 'us-east-2',
      });

      const s3Params = {
        Bucket: s3Bucket,
        Key: filename,
        Expires: 60,
        ContentType: filetype,
        ACL: 'public-read',
      };

      const signedRequest = await s3.getSignedUrl('putObject', s3Params);
      const url = `https://${s3Bucket}.s3.amazonaws.com/${filename}`;
      return {
        signedRequest,
        url,
      };
    },
    createPic: async (parent, args, { models, user }) => {
      try {
        const pic = await models.Pic.create({ ...args, userId: user.id });
        return {
          ok: true,
          pic,
        };
      } catch (err) {
        return {
          ok: false,
          errors: formatErrors(err),
        };
      }
    },
  },
};
