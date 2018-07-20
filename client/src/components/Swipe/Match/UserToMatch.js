/* eslint-disable */

import { Card } from 'antd';
import gql from 'graphql-tag';
import React, { Component } from 'react';
import { Query } from 'react-apollo';
import decode from 'jwt-decode';
import { Expertise } from '../SwipeStyles';
import UserData from './UserData';


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

          const usersToSwipe = data.allUsers.filter(user => user.id != currentUserId)

          return (
            <React.Fragment>
            <Card hoverable style={{ width: 450, height: 600 }}>
            <UserData userData={usersToSwipe}/>
            </Card>
            </React.Fragment>
          );
        }}
      </Query>
    );
  }
}

export default UserToMatch;