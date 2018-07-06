import {
  Button, Card, Carousel, Tag,
} from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import {
  buttonStyles, CarouselContent, Expertise, Wrapper,
} from './ProfileSwipeStyles';

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
      <Expertise>
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
      </Expertise>
      <Expertise>
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
      </Expertise>
      <Expertise>
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
      </Expertise>
    </Card>
  </Wrapper>
);
