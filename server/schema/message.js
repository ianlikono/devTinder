export default `
type Message {
  id: Int!
  text: String!
  sender: User!
  receiverId: Int!
  created_at: String!
}


type Subscription {
    newMessage(teamId: Int!, userId: Int!): Message!
}

type Query {
  messages(teamId: Int!, otherUserId: Int!): [Message!]!
}
type Mutation {
  createMessage(receiverId: Int!, text: String!, teamId: Int!): Boolean!
}
`;
