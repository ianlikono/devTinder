"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = "\n    type Profile {\n        user: User!\n        topics: [Topic]\n        levels: [Level]\n    }\n    type createProfileResponse {\n        ok: Boolean!\n        errors: [Error!]\n    }\n    type Query {\n        getProfileTopics(levelId: Int!): [Topic]\n    }\n    type Mutation {\n        createProfile(topicId: Int, levelId: Int): createProfileResponse!\n      }\n";