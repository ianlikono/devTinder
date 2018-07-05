import React from 'react';
import styled from 'styled-components';
import ProfileSideBar from '../components/profileSidebar/ProfileSidebar';
import EditProfile from '../components/profileSwipe/EditProfile';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default () => (
  <Wrapper>
    <ProfileSideBar />
    <EditProfile />
  </Wrapper>
);
