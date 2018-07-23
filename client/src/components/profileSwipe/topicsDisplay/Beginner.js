import { Tag } from 'antd';
import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { ProfileTopicsQuery } from '../../../graphql/topics';

class Beginner extends Component {
  constructor(props) {
    super(props);

    this.state = {
      levelId: this.props.ExpertId || this.props.intermediateId || this.props.beginnerId,
      tagColor: 'green',
    };
  }

  onTopicDelete = () => {
    console.log('Deleted');
  }

  render() {
    const { levelId } = this.state;
    const { Editable } = this.props;
    const closable = Editable && true;
    return (
      <Query
        pollInterval={500}
        query={ProfileTopicsQuery}
        variables={{
          levelId,
        }}
      >
        {({ loading, error, data }) => {
          if (loading) return 'Loading...';
          if (error) return `Error! ${error.message}`;

          return (
            <div>
              {data.getProfileTopics.map(topic => (
                <Tag closable={closable} key={topic.id} color={this.state.tagColor} onClose={this.onTopicDelete}>
                  {topic.name}
                </Tag>
              ))}
            </div>
          );
        }}
      </Query>
    );
  }
}

export default Beginner;
