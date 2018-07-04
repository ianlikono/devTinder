import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Home from './pages/Home';
import Match from './pages/Match';
import Profile from './pages/Profile';

export default () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/login" exact component={Login} />
      <Route path="/register" exact component={Register} />
      <Route path="/match" exact component={Match} />
      <Route path="/profile/:userId" exact component={Profile} />
    </Switch>
  </BrowserRouter>
);
