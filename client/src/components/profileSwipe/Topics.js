import { Select } from 'antd';
import gql from 'graphql-tag';
import React, { Component } from 'react';
import { graphql, Query } from 'react-apollo';
import { ProfileTopicsQuery } from '../../graphql/topics';

const TopicsQuery = gql`
  {
    allTopics {
      id
      name
    }
  }
`;
class Topics extends Component {
  constructor(props) {
    super(props);

    this.state = {
      levelId: this.props.ExpertId || this.props.intermediateId || this.props.beginnerId,
    };
  }

  handleChange = async (value) => {
    const { levelId } = this.state;
    const topicId = value;
    // console.log(`topicId ${value} levelId ${levelId}`);
    await this.props.mutate({
      variables: { topicId, levelId },
      refetchQueries: [
        {
          query: ProfileTopicsQuery,
          variables: { levelId },
        },
      ],
    });
  };

  render() {
    const Option = Select.Option;
    return (
      <Query query={TopicsQuery} pollInterval={500}>
        {({ loading, error, data }) => {
          if (loading) return 'Loading...';
          if (error) return `Error! ${error.message}`;

          return (
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder="Select a Topic"
              optionFilterProp="children"
              onChange={this.handleChange}
              filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {data.allTopics.map(topic => (
                <Option key={topic.id} value={topic.id}>
                  {topic.name}
                </Option>
              ))}
            </Select>
          );
        }}
      </Query>
    );
  }
}

const createProfileMutation = gql`
  mutation($topicId: Int!, $levelId: Int!) {
    createProfile(topicId: $topicId, levelId: $levelId) {
      ok
      errors {
        path
        message
      }
    }
  }
`;

export default graphql(createProfileMutation)(Topics);
