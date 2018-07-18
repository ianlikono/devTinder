export default `
    type User {
        id: Int!
        username: String!
        email: String!
        location: String!
        pics: [Pic]
        teams: [Team]
        expert: [Topic]
        intermediate: [Topic]
        beginner: [Topic]
    }

    type RegisterResponse {
        ok: Boolean!
        user: User
        errors: [Error!]
    }

    type LoginResponse {
        ok: Boolean!
        token: String
        refreshToken: String
        errors: [Error!]
    }


   type Query {
        getUser(id: Int!): User!
        allUsers: [User!]!
        countAllUsers: Int!
        getUsersToMatch(location: String!): [User!]
    }

   type Mutation {
        register(username: String!, email: String!, password: String!): RegisterResponse!
        login(email: String!, password: String!): LoginResponse!
        updateLocation(location: String!): Boolean!
    }
`;
