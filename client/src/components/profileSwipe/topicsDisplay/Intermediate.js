import { Tag } from 'antd';
import gql from 'graphql-tag';
import React, { Component } from 'react';
import { Query } from 'react-apollo';

const ProfileTopicsQuery = gql`
  query getProfileTopics($levelId: Int!) {
    getProfileTopics(levelId: $levelId) {
      id
      name
    }
  }
`;
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
    return (
      <Query
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
                <Tag key={topic.id} color={this.state.tagColor}>
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
