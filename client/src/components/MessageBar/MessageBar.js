import { Card } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
  background: linear-gradient(262deg, #667eea 0%, #764ba2 100%);
  width: 20vw;
  height: 90vh;
  border-left: 1px solid #e5e9ec;
  box-shadow: 0 1px 10px 0 rgba(0, 17, 25, 0.27);
`;

export default () => (
  <Wrapper>
    <Link to="/messages/1">
      <Card hoverable style={{ margin: 10, marginTop: 100 }}>
        <h3 style={{ color: 'red' }}>
ONGOING
        </h3>
        <h2>
Closures With Someone
        </h2>
      </Card>
    </Link>
    <Link to="/profile/23">
      <Card hoverable style={{ margin: 10, marginTop: 100 }}>
        <h2 style={{ color: '#fd267d' }}>
UPDATE PROFILE
        </h2>
      </Card>
    </Link>
  </Wrapper>
);
