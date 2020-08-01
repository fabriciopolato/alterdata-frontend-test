import React from 'react';
import Routes from './routes';
import GlobalStyle from './styles/global';
import AppProvider from './hooks/index';
import { BrowserRouter as Router } from 'react-router-dom';

const App = () => (
  <Router>
    <AppProvider>
      <Routes />
    </AppProvider>
    <GlobalStyle />
  </Router>
);

export default App;
