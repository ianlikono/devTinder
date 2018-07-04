import { Card, Icon } from 'antd';
import React from 'react';
import styled from 'styled-components';

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
    <Card hoverable>
Awesome
    </Card>
  </Wrapper>
);
