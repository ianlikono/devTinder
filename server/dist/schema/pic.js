"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = "\n    type Pic {\n        id: Int!\n        url: String!\n    }\n\n    type S3Payload {\n        signedRequest: String!,\n        url: String!,\n      }\n\n    type CreatePicResponse {\n        ok: Boolean!\n        pic: Pic\n        errors: [Error!]\n    }\n\n    type Query {\n        getPic(id: Int!): Pic\n        getUserPics(userId: Int):[Pic]\n    }\n\n    type Mutation {\n        createPic(url: String!): CreatePicResponse!\n        signS3(filename: String!, filetype: String!): S3Payload!\n      }\n";