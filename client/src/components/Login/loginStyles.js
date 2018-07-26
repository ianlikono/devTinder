import styled from 'styled-components';
/* eslint-disable */

export const LoginWrapper = styled.div`
  background: linear-gradient(262deg, #ff7854, #fd267d);
  height: 90vh;
  margin: 0px;
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

export const LoginContainer = styled.div`
  background: #fff;
  padding: 20%;
  margin-left: 35%;
  margin-right: 35%;
  margin-top: 2%;
  margin-bottom: 20%;
  border-radius: 10px;
  box-shadow: 0 3px 10px 0 rgba(0, 17, 25, 0.27);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;
export const LoginButton = styled.div`
  margin: 20%;
`;

export const RegisterWrapper = styled.p`
  color: #f7002d;
  display: inline-block;
  margin: 0%;
  font-family: 'Open Sans', sans-serif;
`;

export const buttonStyles = {
  width: 200,
  background: 'linear-gradient(262deg, #ff7854, #fd267d)',
  borderColor: '#ff7854',
  boxShadow: '0 3px 10px 0 rgba(0, 17, 25, 0.27)',
  color: '#fff'
};
export const ErrorsWrapper = styled.h3`
  color: blue;
`