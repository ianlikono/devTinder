import React from 'react';
import styled from 'styled-components';
import MessageBar from '../components/MessageBar/MessageBar';
import MessagesHolder from '../components/Messages/MessagesHolder';
import SendMessage from '../components/Messages/SendMessages';

const teamId = 1;
const userId = 1;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
const MessageContent = styled.div`
  background: #d7dde5;
  width: 100%;
  display: flex;
  flex-direction: column-reverse;

`;
export default () => (
  <Wrapper>
    <MessageBar />
    <MessageContent>
      <SendMessage />
      <MessagesHolder teamId={teamId} userId={userId} />
    </MessageContent>
  </Wrapper>
);
