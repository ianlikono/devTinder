import { Tag } from 'antd';
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
        }
    }
  onSwipe = (e) => {
    let currentUserId = this.state.userData[0].id;
    let lastItem = this.state.userData.length
    const newUserData = this.state.userData.slice(1, lastItem);
    // const newReversedUserData = newUserData.reverse();
    // console.log(newUserData);
    this.setState({userData: newUserData})
    // console.log(currentUserId)
    let nextValue = 0;
    nextValue = e;
    // eslint-disable-next-line
    if (nextValue > this.state.current) {
      // eslint-disable-next-line
      console.log('Disliked');
      this.setState({ current: nextValue });
    } else {
      // eslint-disable-next-line
      console.log('Liked');
      this.setState({ current: nextValue });
    }
  };
    render() {
        const { userData } = this.state;
        console.log(userData)
        return(
            <SwipeableViews style={{ maxHeight: '100%'}} enableMouseEvents onChangeIndex={this.onSwipe}>
                {userData.map(user => {
                return (
                <div>
                <Header>
                <span style={{color: 'red'}}>{user.username}</span>
                </Header>
                <img key={user.id} style={{ padding: 30, height: '250px', width:' 100%', maxHeight: '100%', minHeight: '100%', marginBottom: '50px'}} src={user.pics.length !== 0 ? user.pics[0].url : this.state.defaultUrl} alt ="USER HAS NO IMAGE" />
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
        )
    }
}

export default UserData;