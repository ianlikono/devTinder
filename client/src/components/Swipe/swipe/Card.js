import { Tag } from 'antd';
import cx from 'classnames';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

const Username = styled.span`
  margin-right: 110px;
  font-family: 'Lato', sans-serif;
  font-size: 25px;
`;
const Header = styled.div`
  display: inline;
`;
const Location = styled.span`
  color: #08af13;
`;

export default class Card extends Component {
  constructor(props) {
    super(props);

    this.state = {
      initialPosition: { x: 0, y: 0 },
    };
  }

  componentDidMount() {
    this.setInitialPosition();
    window.addEventListener('resize', this.setInitialPosition);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setInitialPosition);
  }

  setInitialPosition = () => {
    const screen = document.getElementById('draggcard');
    const card = ReactDOM.findDOMNode(this);

    const initialPosition = {
      x: Math.round((screen.offsetWidth - card.offsetWidth) / 2),
      y: Math.round((screen.offsetHeight - card.offsetHeight) / 2),
    };
    this.setState({ initialPosition });
  };

  render() {
    const style = Object.assign(
      {
        transform: `translate3d(${this.state.initialPosition.x}px, ${
          this.state.initialPosition.y
        }px, 0px)`,
        zIndex: this.props.index,
        background: '#fff',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
      },
      this.props.style,
    );
    return (
      <div style={style} className={cx({ card: true }, this.props.classes)}>
        <div style={{ borderBottom: '5px solid red', padding: '15px' }}>
          <Header>
            <Username>
              {this.props.username}
            </Username>
            <Location>
              {this.props.location}
            </Location>
          </Header>
        </div>
        <img
          style={{
            width: '100%',
            height: 200,
            marginBottom: '50px',
            objectFit: 'cover',
          }}
          src={this.props.pic}
          alt="Sorry Nothing To Show"
        />
        <h3>
Expert:
        </h3>
        {this.props.expert.length
          && this.props.expert.map(topic => (
            <Tag key={topic.id} color="red">
              {topic.name}
            </Tag>
          ))}
        <h3>
Intermediate:
        </h3>
        {this.props.intermediate.length
          && this.props.intermediate.map(topic => (
            <Tag key={topic.id} color="blue">
              {topic.name}
            </Tag>
          ))}
        <h3>
Beginner:
        </h3>
        {this.props.beginner.length
          && this.props.beginner.map(topic => (
            <Tag key={topic.id} color="green">
              {topic.name}
            </Tag>
          ))}
      </div>
    );
  }
}

Card.defaultProps = {
  classes: {},
  style: {},
};
