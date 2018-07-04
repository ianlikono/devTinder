import React from 'react';
import styled from 'styled-components';
import ProfileSideBar from '../components/profileSidebar/ProfileSidebar';
import ProfileSwipe from '../components/profileSwipe/ProfileSwipe';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default () => (
  <Wrapper>
    <ProfileSideBar />
    <ProfileSwipe />
  </Wrapper>
);
