import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Dashboard from '../scenes/Dashboard/Dashboard';
import LoginForm from '../scenes/LoginForm/LoginForm';
import BeforeLeave from './components/BeforeLeave';

export default function App() {
  return (
    <Router>
      <React.Fragment>
        <Route exact path="/" component={LoginForm} />
        <BeforeLeave />
        <Route path="/dashboard" component={Dashboard} />
      </ React.Fragment>
    </Router>
  );
}
