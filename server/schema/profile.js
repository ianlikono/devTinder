export default `
    type Profile {
        owner: [User!]!
        location: String!
        expert: [Topic!]
        intermediate: [Topic!]
        beginner: [Topic!]
        pics: [Pic]
    }
    type Mutation {
        createProfile(userId: Int!, location: String!): Boolean!
      }
`;
