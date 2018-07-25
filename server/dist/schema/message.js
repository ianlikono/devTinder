"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = "\ntype Message {\n  id: Int!\n  text: String!\n  sender: User!\n  receiverId: Int!\n  created_at: String!\n}\n\n\ntype Subscription {\n    newMessage(teamId: Int!, userId: Int!): Message!\n}\n\ntype Query {\n  messages(teamId: Int!, otherUserId: Int!): [Message!]!\n}\ntype Mutation {\n  createMessage(receiverId: Int!, text: String!, teamId: Int!): Boolean!\n}\n";