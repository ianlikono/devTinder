import React from 'react';
import styled from 'styled-components';

const Nav = styled.div`
  padding: 1.3%;
  background: linear-gradient(262deg, #ff7854, #fd267d);
  box-shadow: 0 1px 10px 0 rgba(0, 17, 25, 0.27);
  font-size: 1.6rem;
  color: #fff;
  line-height: 1.3125;
  height: 10vh;
`;

const Logo = styled.div`
  font-family: 'Shrikhand', cursive;
`;

export default () => (
  <Nav>
    <Logo>
devTinder
    </Logo>
  </Nav>
);
