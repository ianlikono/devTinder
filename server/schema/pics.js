export default `
    type Pic {
        owner: User!
        url: String!
    }

    type Mutation {
        createPic(url: String!, userId: Int!): Boolean!
      }
`;
