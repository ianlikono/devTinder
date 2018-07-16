import { Card, Icon } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PlacesInput from './PlacesInput';
import UserLocation from './UserLocation';
import Username from './Username';

const Wrapper = styled.div`
  height: 90vh;
  width: 20vw;
  background: #d7dde5;
  border-left: 5px solid #e5e9ec;
  box-shadow: 0 1px 10px 0 #383f44;
`;

const LocationWrapper = styled.div`
  margin: 1%;
`;

const ProfileSidebar = () => (
  <Wrapper>
    <h2 style={{ color: 'green' }}>
      Hello
      {' '}
      <Username />
    </h2>
    <LocationWrapper>
      <Icon type="environment" style={{ fontSize: 25, marginTop: 0, color: '#fd267d' }} />
      <span style={{ margin: '5%', marginTop: 0, fontSize: 24 }}>
        <UserLocation />
      </span>
    </LocationWrapper>
    <Card hoverable style={{ margin: 8 }}>
      <PlacesInput />
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
export default ProfileSidebar;
