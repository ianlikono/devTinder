import React, { Component } from 'react';
import UserToMatch from './Match/UserToMatch';
import { Wrapper } from './SwipeStyles';


class Swipe extends Component {
  render() {
    return (
      <Wrapper>
        <UserToMatch />
      </Wrapper>
    );
  }
}

export default Swipe;
