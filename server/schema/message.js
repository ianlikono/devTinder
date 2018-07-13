export default `
    type Message {
        id: Int!
        text: String!
        team: Team!
    }
    type Mutation {
        createMessage(teamId: Int!, text: String!): Boolean!
      }
`;
