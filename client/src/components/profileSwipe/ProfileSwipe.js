import {
  Button, Card, Carousel, Tag,
} from 'antd';
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const buttonStyles = {
  width: 200,
  background: 'linear-gradient(262deg, #ff7854, #fd267d)',
  borderColor: '#ff7854',
  boxShadow: '0 3px 10px 0 rgba(0, 17, 25, 0.27)',
  letterSpacing: '.02em',
  fontWeight: 600,
  borderRadius: 200,
};

const Wrapper = styled.div`
  background: #d8d6d6;
  width: 80vw;
  border-left: 5px solid #e5e9ec;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CarouselContent = styled.div`
  text-align: center;
  line-height: 400px;
  background: #364d79;
  overflow: hidden;
`;

function onChange(a, b, c) {
  console.log(a, b, c);
}

export default () => (
  <Wrapper>
   <Link to="/profile/23/edit">
    <Button size="large" style={buttonStyles}>
      Edit Info
    </Button>
    </Link>
    <Card hoverable style={{ width: 450, height: 550 }}>
      <Carousel afterChange={onChange}>
        <CarouselContent>
          <h3>
1
          </h3>
        </CarouselContent>
        <CarouselContent>
          <h3>
2
          </h3>
        </CarouselContent>
        <CarouselContent>
          <h3>
3
          </h3>
        </CarouselContent>
        <CarouselContent>
          <h3>
4
          </h3>
        </CarouselContent>
      </Carousel>
      <div>
        <b>
EXPERT:
        </b>
        {' '}
        <Tag color="red">
Closures
        </Tag>
        {' '}
        <Tag color="red">
Promises
        </Tag>
        <Tag color="red">
Async Await
        </Tag>
      </div>
      <div>
        <b>
INTERMEDIATE:
        </b>
        {' '}
        <Tag color="blue">
REACT
        </Tag>
        {' '}
        <Tag color="blue">
VUE
        </Tag>
        <Tag color="blue">
HOF
        </Tag>
        <Tag color="blue">
Mobx
        </Tag>
        <Tag color="blue">
Css
        </Tag>
      </div>
      <div>
        <b>
          {' '}
Beginner:
        </b>
        {' '}
        <Tag color="green">
SQL
        </Tag>
        <Tag color="green">
HOCs
        </Tag>
        <Tag color="green">
Apollo
        </Tag>
        <Tag color="green">
Redux
        </Tag>
        <Tag color="green">
Authentication
        </Tag>
      </div>
    </Card>
  </Wrapper>
);
