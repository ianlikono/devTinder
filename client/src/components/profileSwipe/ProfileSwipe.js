import { Button, Card } from 'antd';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ImagesDisplay from './imagesDisplay/ImagesDisplay';
import { buttonStyles, Expertise, Wrapper } from './ProfileSwipeStyles';
import Beginner from './topicsDisplay/Beginner';
import Expert from './topicsDisplay/Expert';
import Intermediate from './topicsDisplay/Intermediate';

class ProfileSwipe extends Component {
        state = {
          beginnerId: 1,
          intermediateId: 2,
          ExpertId: 3,
        }

        render() {
          const { beginnerId, intermediateId, ExpertId } = this.state;
          return (
            <Wrapper>
              <Link to="/profile/23/edit">
                <Button size="large" style={buttonStyles}>
        Edit Info
                </Button>
              </Link>
              <Card hoverable style={{ width: 450, height: 650 }}>
                <ImagesDisplay />
                <Expertise>
                  <b>
EXPERT:
                  </b>
                  {' '}
                  <Expert ExpertId={ExpertId} />
                </Expertise>
                <Expertise>
                  <b>
INTERMEDIATE:
                  </b>
                  {' '}
                  <Intermediate intermediateId={intermediateId} />
                </Expertise>
                <Expertise>
                  <b>
                    {' '}
Beginner:
                  </b>
                  {' '}
                  <Beginner beginnerId={beginnerId} />
                </Expertise>
              </Card>
            </Wrapper>
          );
        }
}


export default ProfileSwipe;
