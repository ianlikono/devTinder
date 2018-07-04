import { Card } from 'antd';
import React, { Component } from 'react';
import SwipeableViews from 'react-swipeable-views';
import styled from 'styled-components';

const styles = {
  slide: {
    padding: 200,
    minHeight: 100,
    color: '#fff',
  },
  slide1: {
    backgroundColor: '#FEA900',
  },
  slide2: {
    backgroundColor: '#B3DC4A',
  },
  slide3: {
    backgroundColor: '#6AC0FF',
  },
};

const Wrapper = styled.div`
  background: #d7dde5;
  width: 80vw;
  display: flex;
  align-items: center;
  justify-content: center;
`;
class Swipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
    };
  }

  onSwipe = (e) => {
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

  render() {
    return (
      <Wrapper>
        <Card hoverable style={{ width: 450, height: 550 }}>
          <SwipeableViews enableMouseEvents onChangeIndex={this.onSwipe}>
            <div style={Object.assign({}, styles.slide, styles.slide1)}>
slide n°1
            </div>
            <div style={Object.assign({}, styles.slide, styles.slide2)}>
slide n°2
            </div>
            <div style={Object.assign({}, styles.slide, styles.slide3)}>
slide n°3
            </div>
            <div style={Object.assign({}, styles.slide, styles.slide1)}>
slide n°1
            </div>
            <div style={Object.assign({}, styles.slide, styles.slide2)}>
slide n°2
            </div>
            <div style={Object.assign({}, styles.slide, styles.slide3)}>
slide n°3
            </div>
          </SwipeableViews>
        </Card>
      </Wrapper>
    );
  }
}

export default Swipe;
