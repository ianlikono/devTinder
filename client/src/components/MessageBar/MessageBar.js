import React from 'react';
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
    <h1>
Message Bar
    </h1>
  </Wrapper>
);
