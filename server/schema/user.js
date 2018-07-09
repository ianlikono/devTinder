export default `
    type User {
        id: Int!
        username: String!
        email: String!
        phone: Int!
        lat: Float!
        lng: Float!
        pic: String!
        teams: Team!

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
    }

    type Mutation {
        register(username: String!, email: String!, password: String!): RegisterResponse!
        login(email: String!, password: String!): LoginResponse!
    }

`;

// add type profile to user
