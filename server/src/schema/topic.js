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

    type Query {
        allTopics: [Topic!]!
    }

    type Mutation {
        createTopic(name: String!): CreateTopicResponse!
      }
`;
