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
} from './loginStyles';

const FormItem = Form.Item;

class Login extends Component {
  constructor(props) {
    super(props);

    extendObservable(this, {
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
    const { email, password } = this;
    // eslint-disable-next-line
    const response = await this.props.mutate({
      variables: { email, password },
    });
    // console.log(response);
    const {
      ok, token, refreshToken, errors,
    } = response.data.login;
    if (ok) {
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);
      // eslint-disable-next-line
      this.props.history.push('/match');
    } else {
      const err = {};
      errors.forEach(({ path, message }) => {
        err[`${path}Error`] = message;
      });
      this.errors = err;
    }
  };

  render() {
    const {
      email,
      password,
      errors: { emailError, passwordError },
    } = this;

    return (
      <LoginWrapper>
        <LoginContainer>
          <h2 style={{ fontSize: '20px' }}>
Login
          </h2>
          <Form>
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
                type="password"
                onChange={this.onChange}
                placeholder="Password"
                size="large"
                style={{ width: 300, margin: 15 }}
              />
            </FormItem>
            <LoginButton>
              <FormItem>
                <Button size="large" style={buttonStyles} onClick={this.onSubmit}>
                  LOGIN
                </Button>
              </FormItem>
            </LoginButton>
            <Link to="/register">
              <RegisterWrapper>
Missing An Account?. Register Here
              </RegisterWrapper>
            </Link>
          </Form>
        </LoginContainer>
      </LoginWrapper>
    );
  }
}

const loginMutation = gql`
  mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ok
      token
      refreshToken
      errors {
        path
        message
      }
    }
  }
`;

export default graphql(loginMutation)(observer(Login));
