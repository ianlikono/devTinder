import {
  Avatar, Card, Icon, Input, Switch,
} from 'antd';
import React from 'react';
import {
  MessageHolder,
  MessagesContainer,
  MessagesWrapper,
  Receiver,
  Sender,
  Wrapper,
} from './MessagesStyles';

const { TextArea } = Input;

export default () => (
  <Wrapper>
    <MessagesContainer>
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
        />
      </MessageHolder>

      <MessagesWrapper>
        <Sender>
          <Avatar
            size="large"
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          />
          <Card>
Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis, debitis.
          </Card>
        </Sender>
        <Receiver>
          <Card>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolores suscipit obcaecati
            enim iure explicabo voluptatem dicta inventore tenetur, id sunt.
          </Card>
          <Avatar
            size="large"
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          />
        </Receiver>
      </MessagesWrapper>
      <MessagesWrapper>
        <Sender>
          <Avatar
            size="large"
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          />
          <Card>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi voluptatem possimus
            perspiciatis necessitatibus ducimus magnam optio, debitis ipsam et placeat.
          </Card>
        </Sender>
        <Receiver>
          <Card>
Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus, alias.
          </Card>
          <Avatar
            size="large"
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          />
        </Receiver>
      </MessagesWrapper>
    </MessagesContainer>
    <h2 style={{ position: 'absolute', right: '70%' }}>
      <span style={{ color: '#764ba2' }}>
Active: 12 hours
      </span>
    </h2>
    <h2 style={{ position: 'absolute', right: 0 }}>
      <span style={{ margin: '80px' }}>
        <span style={{ color: '#fd267d', fontWeight: 800, letterSpacing: 3 }}>
Done Studying:
        </span>
        {'  '}
        <Switch />
      </span>
    </h2>
  </Wrapper>
);
