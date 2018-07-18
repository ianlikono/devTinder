export default `
    type Pic {
        id: Int!
        url: String!
    }

    type S3Payload {
        signedRequest: String!,
        url: String!,
      }

    type CreatePicResponse {
        ok: Boolean!
        pic: Pic
        errors: [Error!]
    }

    type Query {
        getPic(id: Int!): Pic
        getUserPics(userId: Int):[Pic]
    }

    type Mutation {
        createPic(url: String!): CreatePicResponse!
        signS3(filename: String!, filetype: String!): S3Payload!
      }
`;
