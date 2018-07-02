export default `
    type Message {
        id: Int!
        text: String!
        team: Team!
    }
    type Mutation {
        createMessage(text: String!): Boolean!
      }
`;
