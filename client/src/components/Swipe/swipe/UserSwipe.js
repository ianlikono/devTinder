import { Icon, Modal } from 'antd';
import gql from 'graphql-tag';
import React, { Component } from 'react';
import { compose, graphql, withApollo } from 'react-apollo';
import Card from './Card';
import DraggableCard from './DraggableCard';
import './styles.css';


class UserSwipe extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cards: this.props.userData,
      alertLeft: false,
      alertRight: false,
      visible: false,
    };
    this.removeCardLeft = this.removeCard.bind(this, 'left');
    this.removeCardRight = this.removeCard.bind(this, 'right');
  }

  removeCard = async (side, cardId) => {
    this.setState(state => ({
      cards: state.cards.filter(c => c.id !== cardId),
      alertLeft: side === 'left',
      alertRight: side === 'right',
    }));
    if (side === 'left') {
      // console.log('Disliked', cardId);
    } else {
      // console.log('liked', cardId);
      await this.props.mutate({
        variables: {
          likes: cardId,
        },

      });
      const matchResponse = await this.props.client.query({
        query: gql`
          query($userId: Int!) {
            Match(userId: $userId)
          }
        `,
        variables: { userId: cardId },
      });
      if (matchResponse.data.Match) {
        this.setState({ visible: true });
        // await this.props.client.mutate({
        //   variables: {
        //     name: 'from Client',
        //   },
        // });
      }
    }
  }

  startConversation = (e) => {
    // console.log(e);
    this.setState({
      visible: false,
    });
  }

  keepSwiping = (e) => {
    // console.log(e);
    this.setState({
      visible: false,
    });
  };

  render() {
    // console.log(this.props.mutate);
    const cards = this.state.cards
      .map((c, index, arr) => {
        const props = {
          key: c.id,
          cardId: c.id,
          index,
          username: c.username,
          location: c.location,
          pic: c.pics.length ? c.pics[0].url : 'http://www.bsmc.net.au/wp-content/uploads/No-image-available.jpg',
          expert: c.expert,
          intermediate: c.intermediate,
          beginner: c.beginner,
          onOutScreenLeft: this.removeCardLeft,
          onOutScreenRight: this.removeCardRight,
        };

        const Element = (index === (arr.length - 1) ? DraggableCard : Card);
        return <Element {...props} key={props.key} />;
      });
    return (
      <div>
        {cards.length ? cards : (
          <span style={{ fontSize: '50px', color: '#fd267d' }}>
            <div>
SORRY NO MORE USERS TO SWIPE
            </div>
            <Icon type="frown" style={{ marginLeft: '400px' }} />
            <div>
OR MAYBE RECOMMEND A FRIEND
            </div>
            <Icon type="smile" style={{ marginLeft: '400px' }} />
          </span>
        )}
        <Modal
          title=""
          visible={this.state.visible}
          onOk={this.startConversation}
          onCancel={this.keepSwiping}
          okText="Message"
          cancelText="Keep Swiping"
        >
          <img src="https://d3dcsm00jybemd.cloudfront.net/wp-content/uploads/2015/02/Tinder-Its-a-Match2.jpg" alt="YOU WILL LEARN ALOT TODAY" />
        </Modal>
      </div>
    );
  }
}

const createLikeMutation = gql`
  mutation($likes: Int!) {
    likeUser(likes: $likes){
      ok
    }
  }
`;

export default compose(withApollo, graphql(createLikeMutation))(UserSwipe);
