import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from '../pages/Home';
import TicketPage from '../pages/TicketPage';
import Login from '../pages/Login';

const Routes: React.FC = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/ticket/:id" component={TicketPage} />
    </Switch>
  </Router>
);

export default Routes;
