import { Icon, Input } from 'antd';
import gql from 'graphql-tag';
import React from 'react';
import { graphql } from 'react-apollo';
import { MessageHolder } from './MessagesStyles';

const { TextArea } = Input;


class SendMessages extends React.Component {
  state = {
    text: '',
    receiverId: 1,
    teamId: 1,
  }

  onTextChange = (e) => {
    this.setState({ text: e.target.value });
  }

  onMessageSubmit = async () => {
    const { receiverId, teamId, text } = this.state;
    const response = await this.props.mutate({
      variables: {
        text,
        receiverId,
        teamId,
      },
    });
    this.setState({ text: '' });
    console.log(response);
  }

  render() {
    const { text } = this.state;
    return (
      <MessageHolder>
        <Icon
          type="camera"
          style={{
            color: '#fd267d',
            fontSize: 50,
            marginRight: 0,
            cursor: 'pointer',
          }}
        />
        <TextArea
          placeholder="Input Message"
          style={{
            marginLeft: 0,
            marginBottom: 10,
            width: '73.5vw',
          }}
          onChange={this.onTextChange}
          value={text}
        />
        <Icon
          type="rocket"
          style={{
            color: '#fd267d',
            fontSize: 50,
            alignSelf: 'center',
            cursor: 'pointer',
            marginRight: 0,
          }}
          onClick={this.onMessageSubmit}
        />
      </MessageHolder>
    );
  }
}

const createMessageMutation = gql`
  mutation($receiverId: Int!, $text: String!, $teamId: Int!) {
    createMessage(receiverId: $receiverId, text: $text, teamId: $teamId)
  }
`;

export default graphql(createMessageMutation)(SendMessages);
