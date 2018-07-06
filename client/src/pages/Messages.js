import React from 'react';
import styled from 'styled-components';
import MessageBar from '../components/MessageBar/MessageBar';
import Messages from '../components/Messages/Messages';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
export default () => (
  <Wrapper>
    <MessageBar />
    <Messages />
  </Wrapper>
);
