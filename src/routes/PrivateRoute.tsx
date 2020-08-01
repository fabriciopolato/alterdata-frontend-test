import React from 'react';
import { Route, Redirect, useLocation, RouteProps } from 'react-router-dom';

interface Props extends RouteProps {
  component: React.FC;
}

const PrivateRoute: React.FC<Props> = ({ component: Component, ...rest }) => {
  const location = useLocation();

  const token = localStorage.getItem('alterdata:accessToken');

  if (!token) {
    return <Redirect to={{ pathname: '/login', state: { from: location } }} />;
  }

  return <Route {...rest} component={Component} />;
};

export default PrivateRoute;
