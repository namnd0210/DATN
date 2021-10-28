import Axios from 'axios';
import { LayoutWrapper } from 'common/LayoutWrapper';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Landing } from './landing/Landing';

Axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

if (localStorage.getItem('token')) {
  Axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
} else {
  delete Axios.defaults.headers.common['Authorization'];
}

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Landing} />

        <LayoutWrapper>
          <Switch>
            <Route exact path="/home" component={Landing} />
          </Switch>
        </LayoutWrapper>
      </Switch>
    </Router>
  );
};

export default App;
