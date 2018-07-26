"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = `
    type Team {
        name: String!
        id: Int!
        admin: Boolean!
    }

    type TeamResponse {
        ok: Boolean!
        team: Team
        errors: [Error!]
    }

    type Member {
        userId: String,
    }

    type Query {
        allUserTeams: [Team]
        getUserId(teamId: Int!):[Member]
    }

    type Mutation {
        createTeam(name: String!): TeamResponse!
        addTeamMember(username: String!, teamId: Int!): Boolean!
      }
`;