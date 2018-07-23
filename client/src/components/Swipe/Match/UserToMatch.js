/* eslint-disable */

import gql from 'graphql-tag';
import decode from 'jwt-decode';
import React, { Component } from 'react';
import { Query } from 'react-apollo';
import UserSwipe from '../swipe/UserSwipe';


function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const allUsersQuery = gql`
  {
    allUsers {
      id
      email
      username
      location
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
          const usersToSwipe = data.allUsers.filter(user => user.id != currentUserId)
          const passedData = shuffle(usersToSwipe)
          return (
            <div>
            <div id='draggcard'>
              <UserSwipe userData={passedData}/>
            </div>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default UserToMatch;