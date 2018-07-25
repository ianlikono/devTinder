"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = "\n    type Topic {\n        id: Int!\n        name: String!\n    }\n\n    type CreateTopicResponse {\n        ok: Boolean!\n        topic: Topic\n        errors: [Error!]\n    }\n\n    type Query {\n        allTopics: [Topic!]!\n    }\n\n    type Mutation {\n        createTopic(name: String!): CreateTopicResponse!\n      }\n";