export default `
    type Profile {
        user: User!
        topics: [Topic]
        levels: [Level]
    }

    type createProfileResponse {
        ok: Boolean!
        profile: Profile
        errors: [Error!]
    }

    type Mutation {
        createProfile(topicId: Int, levelId: Int): createProfileResponse!
      }
`;
