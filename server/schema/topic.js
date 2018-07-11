export default `
    type Topic {
        id: Int!
        name: String!
    }

    type Mutation {
        createTopic(name: String!): Boolean!
      }
`;
