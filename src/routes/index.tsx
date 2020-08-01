import React from 'react';
import { Switch, Route } from 'react-router-dom';
// import Route from './Route';
import PrivateRoute from './PrivateRoute';
import Home from '../pages/Home';
import Login from '../pages/Login';

const Routes: React.FC = () => (
  // <Router>
  <Switch>
    <PrivateRoute exact path="/" component={Home} />
    <Route exact path="/login" component={Login} />
  </Switch>
  // </Router>
);

export default Routes;
