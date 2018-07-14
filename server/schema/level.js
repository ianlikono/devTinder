export default `
    type Level {
        id: Int!
        name: String!
    }

    type CreateLevelResponse {
        ok: Boolean!
        level: Level
        errors: [Error!]
    }

    type Query {
        allLevels: [Level!]!
        getLevel(id: Int!): Level!
    }

    type Mutation {
        createLevel(name: String!): CreateLevelResponse!
      }
`;
