import { Button, Input } from 'antd';
import { extendObservable } from 'mobx';
import { observer } from 'mobx-react';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { LoginButton, LoginContainer, LoginWrapper, RegisterWrapper } from '../Login/loginStyles';

const buttonStyles = {
  width: 200,
  background: 'linear-gradient(262deg, #ff7854, #fd267d)',
  borderColor: '#fd267d',
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

  onSubmit = () => {
    console.log(this.username, this.email, this.password);
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
            <Button type="primary" size="large" style={buttonStyles} onClick={this.onSubmit}>
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

export default observer(Register);
