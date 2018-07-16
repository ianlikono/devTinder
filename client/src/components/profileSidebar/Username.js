import decode from 'jwt-decode';
import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { getUserQuery } from '../../graphql/topics';

const userId = () => {
  const token = localStorage.getItem('token');
  const { user } = decode(token);
  return user.id;
};
const id = userId();

class Username extends Component {
  render() {
    return (
      <Query
        query={getUserQuery}
        variables={{
          id,
        }}
      >
        {({ loading, error, data }) => {
          if (loading) return 'Loading...';
          if (error) return `Error! ${error.message}`;

          return (
            <span>
              {data.getUser.username}
            </span>
          );
        }}
      </Query>
    );
  }
}

export default Username;
