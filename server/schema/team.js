export default `
    type Team {
        name: String!
        members: [User!]!
        admin: Boolean!
    }

    type Mutation {
        createTeam(name: String!): Boolean!
        addTeamMember(email: String!, teamId: Int!): Boolean!
      }
`;
