import {
  Button, Form, Icon, Input,
} from 'antd';
import gql from 'graphql-tag';
import { extendObservable } from 'mobx';
import { observer } from 'mobx-react';
import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom';
import {
  buttonStyles,
  LoginButton,
  LoginContainer,
  LoginWrapper,
  RegisterWrapper,
} from '../Login/loginStyles';

const FormItem = Form.Item;

class Register extends Component {
  constructor(props) {
    super(props);

    extendObservable(this, {
      username: '',
      email: '',
      password: '',
      errors: {},
    });
  }

  onChange = (e) => {
    const { name, value } = e.target;
    this[name] = value;
    this.errors = {};
  };

  onSubmit = async () => {
    const { username, email, password } = this;
    // eslint-disable-next-line
    const response = await this.props.mutate({
      variables: { username, email, password },
    });

    const { ok, errors } = response.data.register;

    if (ok) {
      const { history } = this.props;
      history.push('/login');
    } else {
      const err = {};
      errors.forEach(({ path, message }) => {
        err[`${path}Error`] = message;
      });
      this.errors = err;
      // console.log(err);
    }
    // console.log(response);
  };

  render() {
    const {
      username,
      email,
      password,
      errors: { emailError, passwordError, usernameError },
    } = this;

    return (
      <LoginWrapper>
        <LoginContainer>
          <h2 style={{ fontSize: '20px' }}>
Register
          </h2>
          <Form>
            <FormItem help={usernameError} validateStatus={usernameError && 'error'}>
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                value={username}
                name="username"
                onChange={this.onChange}
                placeholder="Username"
                size="large"
                style={{ width: 300, margin: 15 }}
              />
            </FormItem>
            <FormItem help={emailError} validateStatus={emailError && 'error'}>
              <Input
                prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                value={email}
                name="email"
                onChange={this.onChange}
                placeholder="Email"
                size="large"
                style={{ width: 300, margin: 15 }}
              />
            </FormItem>
            <FormItem help={passwordError} validateStatus={passwordError && 'error'}>
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                value={password}
                name="password"
                onChange={this.onChange}
                type="password"
                placeholder="Password"
                size="large"
                style={{ width: 300, margin: 15 }}
              />
            </FormItem>

            <LoginButton>
              <FormItem>
                <Button size="large" style={buttonStyles} onClick={this.onSubmit}>
                  Register
                </Button>
              </FormItem>
            </LoginButton>
            <Link to="/login">
              <RegisterWrapper>
ALready Have An Account?. Login Here
              </RegisterWrapper>
            </Link>
          </Form>
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
