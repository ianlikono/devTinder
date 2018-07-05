import {
  Button, Card, Tag,
} from 'antd';
import React from 'react';
import styled from 'styled-components';
import ImageUpload from './ImageUpload';
import {Link} from 'react-router-dom';

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

const ImageWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export default () => (
  <Wrapper>
  <Link to="/profile/23">
    <Button size="large" style={buttonStyles}>
      Save Info
    </Button>
    </Link>
    <Card hoverable style={{ width: 450, height: 600 }}>
      <ImageWrapper>
        <Card hoverable style={{ width: 200, height: 200, marginTop: 3 }}>
          <ImageUpload />
        </Card>
        <Card hoverable style={{ width: 200, height: 200, marginTop: 3 }}>
        <ImageUpload />
        </Card>
        <Card hoverable style={{ width: 200, height: 200, marginTop: 3 }}>
        <ImageUpload />
        </Card>
        <Card hoverable style={{ width: 200, height: 200, marginTop: 3 }}>
        <ImageUpload />
        </Card>
      </ImageWrapper>

      <h2
        style={{
          margin: 15,
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
        }}
      >
        Expert:
        {' '}
        <Tag color="red">
closures
        </Tag>
        <Tag color="red">
Promises
        </Tag>
        <Tag color="red">
async
        </Tag>
        <Tag color="red">
react
        </Tag>
      </h2>
      <h2
        style={{
          margin: 15,
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
        }}
      >
        Intermediate:
        {' '}
        <Tag color="blue">
Vue
        </Tag>
        <Tag color="blue">
Auth0
        </Tag>
        <Tag color="blue">
SQL
        </Tag>
        <Tag color="blue">
Mongo
        </Tag>
      </h2>
      <h2
        style={{
          margin: 15,
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
        }}
      >
        Begginner:
        {' '}
        <Tag color="green">
Vue
        </Tag>
        <Tag color="green">
Auth0
        </Tag>
        <Tag color="green">
SQL
        </Tag>
        <Tag color="green">
Mongo
        </Tag>
      </h2>
    </Card>
  </Wrapper>
);
