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
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;
class Swipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  onSwipe = (e) => {
    // eslint-disable-next-line
    e ? console.log('Disliked') : console.log('Liked');
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
          </SwipeableViews>
        </Card>
      </Wrapper>
    );
  }
}

export default Swipe;
