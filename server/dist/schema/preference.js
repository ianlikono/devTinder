"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = "\n    type Preference {\n        user: User!\n    }\n    type createPreferenceResponse {\n        ok: Boolean!\n        errors: [Error!]\n    }\n    type MatchResponse {\n        ok: Boolean!\n    }\n    type Query {\n        Match(userId: Int!): Boolean!\n    }\n    type Mutation {\n        likeUser(likes: Int!): createPreferenceResponse!\n        disLikeUser(dislikes: Int!): createPreferenceResponse!\n      }\n";