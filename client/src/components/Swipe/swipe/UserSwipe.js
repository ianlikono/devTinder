import React, { Component } from 'react';
import Card from './Card';
import DraggableCard from './DraggableCard';
import './styles.css';

class UserSwipe extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cards: [{ username: 'ian1' }, { username: 'ian2' }, { username: 'ian3' }],
      alertLeft: false,
      alertRight: false,
    };
  }

  removeCard = (side, cardId) => {
    this.setState(state => ({
      cards: state.cards.filter(c => c.id !== cardId),
      alertLeft: side === 'left',
      alertRight: side === 'right',
    }));
  }

  keepSwiping = () => {
    this.setState({ alertLeft: true });
  }

  render() {
    console.log(this.state.cards);
    const cards = this.state.cards
      .map((c, index, arr) => {
        const props = {
          key: c.id,
          cardId: c.id,
          index,
          username: c.username,
          onOutScreenLeft: this.removeCardLeft,
          onOutScreenRight: this.removeCardRight,
        };

        const Element = (index === (arr.length - 1) ? DraggableCard : Card);
        return <Element {...props} key={props.key} />;
      });
    return (
      <div>
        {cards}
      </div>
    );
  }
}

export default UserSwipe;
