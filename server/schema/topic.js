export default `
    type Topic {
        id: Int!
        name: String!
        pic: String!
    }

    type Mutation {
        createTopic(name: String!): Boolean!
      }
`;
