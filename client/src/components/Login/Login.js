import { Button, Input } from 'antd';
import { extendObservable } from 'mobx';
import { observer } from 'mobx-react';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { LoginButton, LoginContainer, LoginWrapper, RegisterWrapper } from './loginStyles';

const buttonStyles = {
  width: 200,
  background: 'linear-gradient(262deg, #ff7854, #fd267d)',
  borderColor: '#ff7854',
  boxShadow: '0 3px 10px 0 rgba(0, 17, 25, 0.27)',
};

class Login extends Component {
  constructor(props) {
    super(props);

    extendObservable(this, {
      email: '',
      password: '',
    });
  }

  onChange = (e) => {
    const { name, value } = e.target;
    this[name] = value;
  };

  onSubmit = () => {
    console.log(this.email, this.password);
  };

  render() {
    const { email, password } = this;

    return (
      <LoginWrapper>
        <LoginContainer>
          <h2>
Login Header
          </h2>
          <Input
            value={email}
            name="email"
            onChange={this.onChange}
            placeholder="Email"
            size="large"
            style={{ width: 300, margin: 25 }}
          />
          <Input
            value={password}
            name="password"
            type="password"
            onChange={this.onChange}
            placeholder="Password"
            size="large"
            style={{ width: 300 }}
          />
          <LoginButton>
            <Button type="primary" size="large" style={buttonStyles} onClick={this.onSubmit}>
              LOGIN
            </Button>
          </LoginButton>
          <Link to="/register">
            <RegisterWrapper>
Missing An Account?. Register Here
            </RegisterWrapper>
          </Link>
        </LoginContainer>
      </LoginWrapper>
    );
  }
}

export default observer(Login);
