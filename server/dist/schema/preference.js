"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = `
    type Preference {
        user: User!
    }
    type createPreferenceResponse {
        ok: Boolean!
        errors: [Error!]
    }
    type MatchResponse {
        ok: Boolean!
    }
    type Query {
        Match(userId: Int!): Boolean!
    }
    type Mutation {
        likeUser(likes: Int!): createPreferenceResponse!
        disLikeUser(dislikes: Int!): createPreferenceResponse!
      }
`;