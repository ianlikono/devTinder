import { Tag } from 'antd';
import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { ProfileTopicsQuery } from '../../../graphql/topics';

class Intermediate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      levelId: this.props.ExpertId || this.props.intermediateId || this.props.beginnerId,
      tagColor: 'blue',
    };
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
                <Tag closable={closable} key={topic.id} color={this.state.tagColor}>
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

export default Intermediate;
