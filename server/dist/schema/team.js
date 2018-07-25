"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = "\n    type Team {\n        name: String!\n        id: Int!\n        admin: Boolean!\n    }\n\n    type TeamResponse {\n        ok: Boolean!\n        team: Team\n        errors: [Error!]\n    }\n\n    type Member {\n        userId: String,\n    }\n\n    type Query {\n        allUserTeams: [Team]\n        getUserId(teamId: Int!):[Member]\n    }\n\n    type Mutation {\n        createTeam(name: String!): TeamResponse!\n        addTeamMember(username: String!, teamId: Int!): Boolean!\n      }\n";