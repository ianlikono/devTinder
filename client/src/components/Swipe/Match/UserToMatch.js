/* eslint-disable */

import gql from 'graphql-tag';
import decode from 'jwt-decode';
import React, { Component } from 'react';
import { Query } from 'react-apollo';
import UserSwipe from '../swipe/UserSwipe';


const allUsersQuery = gql`
  {
    allUsers {
      id
      email
      username
      pics {
          url
      }
      expert {
        name
        id
      }
      intermediate {
        name
        id
      }
      beginner {
        name
        id
      }
    }
  }
`;


class UserToMatch extends Component {
  constructor(props) {
    super(props);
    this.state = {

      user: null,
    };
  }

  onLikeClick = (e) => {
    console.log(e)
  }

  userId = () => {
    const token = localStorage.getItem('token');
    const { user } = decode(token);
    return user.id;
  };


  render() {
    const currentUserId = this.userId();
    return (
      <Query query={allUsersQuery}>
        {({ loading, error, data }) => {
          if (loading) return 'Loading...';
          if (error) return `Error! ${error.message}`;
          return (
            <div>
            <div id='draggcard'>
            {/* <UserData userData={usersToSwipe}/> */}
              <UserSwipe />
            </div>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default UserToMatch;