import { Button, Input } from 'antd';
import gql from 'graphql-tag';
import { extendObservable } from 'mobx';
import { observer } from 'mobx-react';
import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom';
import {
  LoginButton, LoginContainer, LoginWrapper, RegisterWrapper,
} from '../Login/loginStyles';

const buttonStyles = {
  width: 200,
  background: 'linear-gradient(262deg, #ff7854, #fd267d)',
  borderColor: '#ff7854',
  boxShadow: '0 3px 10px 0 rgba(0, 17, 25, 0.27)',
};
class Register extends Component {
  constructor(props) {
    super(props);

    extendObservable(this, {
      username: '',
      email: '',
      password: '',
    });
  }

  onChange = (e) => {
    const { name, value } = e.target;
    this[name] = value;
  };

  onSubmit = async () => {
    const { username, email, password } = this;
    // eslint-disable-next-line
    const response = await this.props.mutate({
      variables: { username, email, password },
    });
    console.log(response);
  };

  render() {
    const { username, email, password } = this;
    return (
      <LoginWrapper>
        <LoginContainer>
          <h2>
Register Header
          </h2>
          <Input
            value={username}
            name="username"
            onChange={this.onChange}
            placeholder="Username"
            size="large"
            style={{ width: 300, margin: 15 }}
          />
          <Input
            value={email}
            name="email"
            onChange={this.onChange}
            placeholder="Email"
            size="large"
            style={{ width: 300, margin: 15 }}
          />
          <Input
            value={password}
            name="password"
            onChange={this.onChange}
            type="password"
            placeholder="Password"
            size="large"
            style={{ width: 300, margin: 15 }}
          />
          <LoginButton>
            <Button  size="large" style={buttonStyles} onClick={this.onSubmit}>
              Register
            </Button>
          </LoginButton>
          <Link to="/login">
            <RegisterWrapper>
ALready Have An Account?. Login Here
            </RegisterWrapper>
          </Link>
        </LoginContainer>
      </LoginWrapper>
    );
  }
}

const registerMutation = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password) {
      ok
      errors {
        path
        message
      }
    }
  }
`;

export default graphql(registerMutation)(observer(Register));
