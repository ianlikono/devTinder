export default `
    type Preference {
        user: User!
    }
    type createPreferenceResponse {
        ok: Boolean!
        errors: [Error!]
    }
    type Query {
        Match(userToMatchId: Int!): User
    }
    type Mutation {
        likeUser(likes: Int!): createPreferenceResponse!
        disLikeUser(dislikes: Int!): createPreferenceResponse!
      }
`;
