import { Card, Icon } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import DistanceSlider from './DistanceSlider';
import LevelSlider from './LevelSlider';
import PlacesInput from './PlacesInput';

const Wrapper = styled.div`
  height: 90vh;
  width: 20vw;
  background: #d7dde5;
  border-left: 5px solid #e5e9ec;
  box-shadow: 0 1px 10px 0 #383f44;
`;

const LocationWrapper = styled.div`
  margin: 1%;
  display: flex;
  align-items: center;
`;

export default () => (
  <Wrapper>
    <LocationWrapper>
      <Icon type="environment" style={{ fontSize: 25, color: '#fd267d' }} />
      <span style={{ margin: '5%', fontSize: 24 }}>
Dallas
      </span>
    </LocationWrapper>
    <Card hoverable style={{ margin: 8 }}>
      <PlacesInput />
    </Card>
    <Card hoverable style={{ margin: 8 }}>
      <h3>
Distance In Miles
      </h3>
      <DistanceSlider />
    </Card>
    <Card hoverable style={{ margin: 8 }}>
      <h3>
Coding Level
      </h3>
      <LevelSlider />
    </Card>
    <Link to="/match">
      <Card hoverable style={{ margin: 8 }}>
        <h1 style={{ textAlign: 'center', color: '#fd267d' }}>
HOME
        </h1>
      </Card>
    </Link>
    <Card hoverable style={{ margin: 8 }}>
      <h1 style={{ textAlign: 'center', color: '#fd267d' }}>
LOGOUT
      </h1>
    </Card>
  </Wrapper>
);
