export default `
    type Team {
        members: [User!]!
        lifetime: String!
    }

    type Mutation {
        createTeam(name: String!): Boolean!
      }
`;
