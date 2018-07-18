import gql from 'graphql-tag';
import React, { Component } from 'react';
import { Query } from 'react-apollo';
import SwipeableViews from 'react-swipeable-views';
import { Tag, Card } from 'antd';
import { Expertise } from '../SwipeStyles';


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

const ids = [];

class UserToMatch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      defaultUrl: '',
      user: null,
    };
  }

  onSwipe = (e, likes) => {
    ids.sort()
    console.log(ids[e]);
    let nextValue = 0;
    nextValue = e;
    // eslint-disable-next-line
    if (nextValue > this.state.current) {
      // eslint-disable-next-line
      console.log('Disliked', 'current:', this.state.current, ' NextValue:', nextValue);
      this.setState({ current: nextValue });
    } else {
      // eslint-disable-next-line
      console.log('Liked', 'current:', this.state.current, ' NextValue:', nextValue);
      this.setState({ current: nextValue });
    }
  };
  onLikeClick = (e) => {
    console.log(e)
  }

  render() {
    return (
      <Query query={allUsersQuery}>
        {({ loading, error, data }) => {
          if (loading) return 'Loading...';
          if (error) return `Error! ${error.message}`;

          return (
            <React.Fragment>
            <Card hoverable style={{ width: 450, height: 600 }}>
            <SwipeableViews style={{ maxHeight: '100%'}} enableMouseEvents onChangeIndex={this.onSwipe}>
              {data.allUsers.map(user => {
                if (!ids.includes(user.id)) ids.push(user.id)
                return (
                <div>
                <h3>{user.username}</h3>
                <img key={user.id} style={{ padding: 30, height: '100%', width:' 100%', maxHeight: '100%', minHeight: '100%', marginBottom: '50px'}} src={user.pics.length !== 0 ? user.pics[0].url : this.state.defaultUrl} alt ="USER HAS NO IMAGE" />
                <Expertise>
                <h3>Expert:</h3>
                {user.expert.length && user.expert.map(topic => (
                  <Tag key={topic.id} color="red">
                  {topic.name}
                </Tag>
                ))}
                </Expertise>
                <Expertise>
                <h3>Intermediate:</h3>
                {user.intermediate.length && user.intermediate.map(topic => (
                  <Tag key={topic.id} color="blue">
                  {topic.name}
                </Tag>
                ))}
                </Expertise>
                <Expertise>
                <h3>Beginner:</h3>
                {user.beginner.length && user.beginner.map(topic => (
                  <Tag key={topic.id} color="green">
                  {topic.name}
                </Tag>
                ))}
                </Expertise>
                </div>
              )})}
            </SwipeableViews>
            </Card>
            <button onClick={this.onLikeClick}>Click Me</button>
            </React.Fragment>
          );
        }}
      </Query>
    );
  }
}

export default UserToMatch;
