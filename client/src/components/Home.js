import gql from 'graphql-tag';
import React from 'react';
import { graphql } from 'react-apollo';

const Home = ({ data: { loading, allUsers } }) => (loading ? null : allUsers.map(u => (
  <h2 key={u.id}>
    {u.email}
  </h2>
)));

const allUsersQuery = gql`
  {
    allUsers {
      id
      email
    }
  }
`;

export default graphql(allUsersQuery)(Home);
