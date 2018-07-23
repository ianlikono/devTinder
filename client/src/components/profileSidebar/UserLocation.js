import decode from 'jwt-decode';
import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { getUserQuery } from '../../graphql/topics';


class UserLocation extends Component {
  userId = () => {
    const token = localStorage.getItem('token');
    const { user } = decode(token);
    return user.id;
  };

  render() {
    const id = this.userId();

    return (
      <Query
        pollInterval={500}
        query={getUserQuery}
        variables={{
          id,
        }}
      >
        {({ loading, error, data }) => {
          if (loading) return 'Loading...';
          if (error) return `Error! ${error.message}`;

          return (
            <span style={{ color: '#fd267d' }}>
              {data.getUser.location}
            </span>
          );
        }}
      </Query>
    );
  }
}

export default UserLocation;
