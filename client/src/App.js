import decode from 'jwt-decode';
import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import EditProfile from './pages/EditProfile';
import Match from './pages/Match';
import Messages from './pages/Messages';
import Profile from './pages/Profile';

const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  const refreshToken = localStorage.getItem('refreshToken');
  try {
    decode(token);
    decode(refreshToken);
  } catch (err) {
    return false;
  }

  return true;
};

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (isAuthenticated() ? (
      <Component {...props} />
    ) : (
      <Redirect
        to={{
          pathname: '/login',
        }}
      />
    ))
    }
  />
);

export default () => (
  <BrowserRouter>
    <Switch>
      <PrivateRoute path="/" exact component={Match} />
      <Route path="/login" exact component={Login} />
      <Route path="/register" exact component={Register} />
      <PrivateRoute path="/match" exact component={Match} />
      <PrivateRoute path="/profile/:userId" exact component={Profile} />
      <PrivateRoute path="/profile/:userId/edit" exact component={EditProfile} />
      <PrivateRoute path="/messages/:teamId/:userId" exact component={Messages} />
    </Switch>
  </BrowserRouter>
);
