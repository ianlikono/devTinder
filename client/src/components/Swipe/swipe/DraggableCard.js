import Hammer from 'hammerjs';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Card from './Card';

export default class DraggableCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      x: 0,
      y: 0,
      initialPosition: { x: 0, y: 0 },
      startPosition: { x: 0, y: 0 },
      animation: null,
    };
    this.handlePan = this.handlePan.bind(this);
  }

resetPosition = () => {
  const screen = document.getElementById('draggcard');
  const card = ReactDOM.findDOMNode(this);

  const initialPosition = {
    x: Math.round((screen.offsetWidth - card.offsetWidth) / 2),
    y: Math.round((screen.offsetHeight - card.offsetHeight) / 2),
  };

  this.setState({
    x: initialPosition.x,
    y: initialPosition.y,
    initialPosition,
    startPosition: { x: 0, y: 0 },
  });
}

panstart = () => {
  this.setState({
    animation: false,
    startPosition: { x: this.state.x, y: this.state.y },
  });
}

panend = (ev) => {
  const screen = document.getElementById('draggcard');
  const card = ReactDOM.findDOMNode(this);
  if (this.state.x < -50) {
    this.props.onOutScreenLeft(this.props.cardId);
  } else if ((this.state.x + (card.offsetWidth - 50)) > screen.offsetWidth) {
    this.props.onOutScreenRight(this.props.cardId);
  } else {
    this.resetPosition();
    this.setState({ animation: true });
  }
}

panmove = (ev) => {
  this.setState(this.calculatePosition(ev.deltaX, ev.deltaY));
  // this.setState({ visible: true });
}

handlePan(ev) {
  ev.preventDefault();
  switch (ev.type) {
    case 'panstart':
      this.panstart();
      break;

    case 'panend':
      this.panend(ev);
      break;

    case 'panmove':
      this.panmove(ev);
      break;

    default:
      return false;
  }
  return false;
}


calculatePosition = (deltaX, deltaY) => (
  { x: (this.state.initialPosition.x + deltaX), y: (this.state.initialPosition.y + deltaY) })


componentDidMount() {
  this.hammer = new Hammer.Manager(ReactDOM.findDOMNode(this));
  this.hammer.add(new Hammer.Pan({ threshold: 0 }));
  this.hammer.on('panstart panend pancancel panmove', this.handlePan.bind(this));
  this.resetPosition();
  window.addEventListener('resize', this.resetPosition);
}

componentWillUnmount() {
  this.hammer.stop();
  this.hammer.destroy();
  this.hammer = null;
  window.removeEventListener('resize', this.resetPosition);
}


render() {
  return (
    <Card
      {...this.props}
      style={{ transform: `translate3d(${this.state.x}px, ${this.state.y}px, 0px)` }}
      classes={{ animate: this.state.animation }}
    />
  );
}
}
