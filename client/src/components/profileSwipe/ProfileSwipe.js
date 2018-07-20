import { Button, Card } from 'antd';
import decode from 'jwt-decode';
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
          Editable: false,
        }

        userId = () => {
          const token = localStorage.getItem('token');
          const { user } = decode(token);
          return user.id;
        };


        render() {
          const id = this.userId();
          const link = `/profile/${id}/edit`;
          const {
            beginnerId, intermediateId, ExpertId, Editable,
          } = this.state;
          return (
            <Wrapper>
              <Link to={link}>
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
                  <Expert Editable={Editable} ExpertId={ExpertId} />
                </Expertise>
                <Expertise>
                  <b>
INTERMEDIATE:
                  </b>
                  {' '}
                  <Intermediate Editable={Editable} intermediateId={intermediateId} />
                </Expertise>
                <Expertise>
                  <b>
                    {' '}
Beginner:
                  </b>
                  {' '}
                  <Beginner Editable={Editable} beginnerId={beginnerId} />
                </Expertise>
              </Card>
            </Wrapper>
          );
        }
}


export default ProfileSwipe;
