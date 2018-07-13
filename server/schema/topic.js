export default `
    type Topic {
        id: Int!
        name: String!
    }

    type CreateTopicResponse {
        ok: Boolean!
        topic: Topic
        errors: [Error!]
    }

    type Mutation {
        createTopic(name: String!): CreateTopicResponse!
      }
`;
