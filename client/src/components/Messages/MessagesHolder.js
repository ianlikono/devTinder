import { Avatar, Card } from 'antd';
import gql from 'graphql-tag';
import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import styled from 'styled-components';
import { MessagesWrapper, Sender } from './MessagesStyles';

const MessageDirection = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 0;
`;

const newMessageSubscription = gql`
  subscription($teamId: Int!, $userId: Int!) {
    newMessage(teamId: $teamId, userId: $userId) {
      id
      sender {
        username
      }
      text
      created_at
    }
  }
`;


class MessagesHolder extends Component {
  componentWillMount() {
    this.unsubscribe = this.subscribe(this.props.teamId, this.props.userId);
  }

  componentWillReceiveProps({ teamId, userId }) {
    if (this.props.teamId !== teamId || this.props.userId !== userId) {
      if (this.unsubscribe) {
        this.unsubscribe();
      }
      this.unsubscribe = this.subscribe(teamId, userId);
    }
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  subscribe = (teamId, userId) => this.props.data.subscribeToMore({
    document: newMessageSubscription,
    variables: {
      teamId,
      userId,
    },
    updateQuery: (prev, { subscriptionData }) => {
      if (!subscriptionData) {
        return prev;
      }
      return {
        ...prev,
        messages: [...prev.messages, subscriptionData.newMessage],
      };
    },
  })

  render() {
    const { data: { loading, messages } } = this.props;
    const defaultUrl = 'http://www.bsmc.net.au/wp-content/uploads/No-image-available.jpg';
    return loading ? null : (
      <MessageDirection>
        <MessagesWrapper>

          {messages.map(message => (
            <Sender>
              <Avatar size="large" src={message.sender.pics.length ? message.sender.pics[0].url : defaultUrl} />
              <Card>
                <h3>
                  {message.sender.username}
                </h3>
                <h3>
                  {message.created_at}
                </h3>
                <div>
                  {message.text}
                </div>
              </Card>
            </Sender>
          ))}
        </MessagesWrapper>

      </MessageDirection>
    );
  }
}

const messagesQuery = gql`
  query($teamId: Int!, $userId: Int!) {
    messages(teamId: $teamId, otherUserId: $userId) {
      id
      sender {
        username
        pics {
          url
        }
      }
      text
      created_at
    }
  }
`;

export default graphql(messagesQuery, {
  options: props => ({
    fetchPolicy: 'network-only',
    variables: {
      teamId: props.teamId,
      userId: props.userId,
    },
  }),
})(MessagesHolder);
