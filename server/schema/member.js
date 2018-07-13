export default `
    type Member {
        user: User!
        team: [Team]
    }

    type AddMemberResponse {
        ok: Boolean!
        member: Member
        errors: [Error!]
    }

    type Mutation {
        addMember: AddMemberResponse!
      }
`;
