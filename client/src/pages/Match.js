import React from 'react';
import styled from 'styled-components';
import MessageBar from '../components/MessageBar/MessageBar';
import Swipe from '../components/Swipe/Swipe';


const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default () => (
  <Wrapper>
    <MessageBar />
    <Swipe />
  </Wrapper>
);
