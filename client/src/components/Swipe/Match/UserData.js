import { Card, Icon, Tag } from 'antd';
import React, { Component } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { Expertise } from '../SwipeStyles';
import { Header } from './UserToMatchStyles';


class UserData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: this.props.userData,
      defaultUrl: 'http://www.bsmc.net.au/wp-content/uploads/No-image-available.jpg',
      current: 0,
      firstItem: 'SWIPE RIGHT TO BEGIN',
      likeDislike: '',
      index: 0,
    };
  }

   onSwipe = (e, index) => {
     console.log(index);
     this.setState({ index: 0 });
     this.setState({ likeDislike: '' });
     const currentUserId = this.state.userData.length && this.state.userData[0].id;
     // console.log(currentUserId);

     const newUserDataFunction = () => {
       console.log(index);
       const newUserData = this.state.userData;
       if (index >= 1 && this.state.userData.length) {
         newUserData.slice(1);
       }
       return newUserData;
     };
     const newUserData = newUserDataFunction();
     // const
     // const newReversedUserData = newUserData.reverse();
     // console.log(newUserData);
     this.setState({ userData: newUserData });
     // console.log(currentUserId)
     let nextValue = 0;
     nextValue = e;
     // eslint-disable-next-line
    if (nextValue > this.state.current) {
       // eslint-disable-next-line
      // console.log('Disliked');
       this.setState({ current: nextValue });
     } else {
       // eslint-disable-next-line
      // console.log('Liked');
       this.setState({ current: nextValue });
     }
     this.setState({ firstItem: 'SWIPE RIGHT TO CONTINUE' });
     this.setState({ index: 0 });
   };

  onUserSwitch = (e) => {
    if (e >= 1) {
      this.setState({ likeDislike: 'LIKE' });
    } else if (e < 1) {
      this.setState({ likeDislike: 'DISLIKE' });
    }
  }

  render() {
    const {
      userData, firstItem, likeDislike, index,
    } = this.state;
    console.log(userData);
    return (
      <React.Fragment>
        <h1 style={{
          position: 'absolute', zIndex: 10, marginLeft: '150px', color: '#22cc04',
        }}
        >
          {likeDislike}
        </h1>
        <SwipeableViews style={{ maxHeight: '100%' }} enableMouseEvents onChangeIndex={this.onSwipe} onSwitching={this.onUserSwitch} index={index}>
          <Card
            value={1}
            style={{
              width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'linear-gradient(262deg,#ff7854,#fd267d)',
            }}
          >
            <h1 style={{ textAlign: 'center', color: '#fff', fontFamily: 'Shrikhand' }}>
              {firstItem}
            </h1>
            <Icon
              style={{
                color: '#fff', fontSize: 50, display: 'flex', justifyContent: 'center',
              }}
              type="right-circle"
            />
          </Card>
          {userData.map(user => (
            <div key={user.id}>
              <Header>
                <span style={{ color: 'red' }}>
                  {user.username}
                </span>
              </Header>
              { /* eslint-disable-next-line */ }
            <img
              key={user.id}
              style={{
                padding: 30, height: '250px', width: ' 100%', maxHeight: '100%', minHeight: '100%', marginBottom: '50px',
              }}
              src={user.pics.length !== 0 ? user.pics[0].url : this.state.defaultUrl}
              alt="USER HAS NO PIC"
            />
              <Expertise>
                <h3>
Expert:
                </h3>
                {user.expert.length && user.expert.map(topic => (
                  <Tag key={topic.id} color="red">
                    {topic.name}
                  </Tag>
                ))}
              </Expertise>
              <Expertise>
                <h3>
Intermediate:
                </h3>
                {user.intermediate.length && user.intermediate.map(topic => (
                  <Tag key={topic.id} color="blue">
                    {topic.name}
                  </Tag>
                ))}
              </Expertise>
              <Expertise>
                <h3>
Beginner:
                </h3>
                {user.beginner.length && user.beginner.map(topic => (
                  <Tag key={topic.id} color="green">
                    {topic.name}
                  </Tag>
                ))}
              </Expertise>
            </div>
          ))}
          <Card style={{
            width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'linear-gradient(262deg,#ff7854,#fd267d)',
          }}
          >
            <h1 style={{ textAlign: 'center', color: '#fff', fontFamily: 'Shrikhand' }}>
            SORRY NO MORE PEOPLE TO SWIPE
            </h1>
            <Icon
              style={{
                color: '#fff', fontSize: 50, display: 'flex', justifyContent: 'center',
              }}
              type="frown"
            />
          </Card>
        </SwipeableViews>
      </React.Fragment>
    );
  }
}

export default UserData;
