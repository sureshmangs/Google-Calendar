import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './store';


import './index.css';
import App from './App';
import HomePage from './components/HomePage';
import SignUp from './components/SignUp';
import authGuard from './components/HOCs/authGuard'
import Dashboard from './components/Dashboard';

import * as serviceWorker from './serviceWorker';

const routing = (
  <Provider store={store}>
    <Router>
      <Switch>
        <App>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/dashboard" component={authGuard(Dashboard)} />
        </App>
      </Switch>
    </Router>
  </Provider>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
