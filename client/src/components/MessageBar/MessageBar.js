import { Card } from 'antd';
import decode from 'jwt-decode';
import React from 'react';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { GetUserTeams } from '../../graphql/topics';

const Wrapper = styled.div`
  background: linear-gradient(262deg, #667eea 0%, #764ba2 100%);
  width: 20vw;
  height: 90vh;
  border-left: 1px solid #e5e9ec;
  box-shadow: 0 1px 10px 0 rgba(0, 17, 25, 0.27);
`;

export default class extends React.Component {
  userId = () => {
    const token = localStorage.getItem('token');
    const { user } = decode(token);
    return user.id;
  };


  render() {
    const id = this.userId();
    const link = `/profile/${id}`;
    return (
      <Wrapper>
        <Card hoverable style={{ margin: 10, marginTop: 100 }}>
          <h2 style={{ color: 'red', fontSize: '30px' }}>
    ONGOING
          </h2>
          <h2>
            <Query query={GetUserTeams} pollInterval={500}>
              {({ loading, error, data }) => {
                if (loading) return 'Loading...';
                if (error) return `Error! ${error.message}`;

                return (
                  <React.Fragment>
                    {data.allUserTeams.length ? data.allUserTeams.map(team => (
                      <Card key={team.id} hoverable style={{ marginTop: '50px' }}>
                        <span style={{ fontSize: '24px', alignContent: 'center' }}>
                          {team.name}
                        </span>
                      </Card>
                    )) : (
                      <Card>
                        <span style={{ fontSize: '24px', alignContent: 'center' }}>
SORRY YOU HAVE NOTHING ONGOING START SWIPING TO GET BUSY
                        </span>
                      </Card>
                    )}
                  </React.Fragment>
                );
              }}
            </Query>
          </h2>
        </Card>
        <Link to={link}>
          <Card hoverable style={{ margin: 10, marginTop: 100 }}>
            <h2 style={{ color: '#fd267d' }}>
    UPDATE PROFILE
            </h2>
          </Card>
        </Link>
      </Wrapper>
    );
  }
}
