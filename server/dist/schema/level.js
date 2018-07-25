"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = "\n    type Level {\n        id: Int!\n        name: String!\n    }\n\n    type CreateLevelResponse {\n        ok: Boolean!\n        level: Level\n        errors: [Error!]\n    }\n\n    type Query {\n        allLevels: [Level!]!\n        getLevel(id: Int!): Level!\n    }\n\n    type Mutation {\n        createLevel(name: String!): CreateLevelResponse!\n      }\n";