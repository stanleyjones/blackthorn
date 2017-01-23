import React from 'react';
import { render } from 'react-dom';
import { Route, Router, browserHistory } from 'react-router';

const logIn = () => <div>Log In</div>;
const logOut = () => <div>Log Out</div>;
const campaigns = () => <div>Campaigns</div>;
const notFound = () => <div>404</div>;

const isLoggedIn = () => false;

const authenticate = (nextState, replace) => {
  if (!isLoggedIn()) { replace({ pathname: '/login' }); }
}

render((
  <Router history={browserHistory}>
    <Route path="/login" component={logIn}/>
    <Route path="/logout" component={logOut}/>
    <Route path="/" component={campaigns} onEnter={authenticate}/>
    <Route path="*" component={notFound}/>
  </Router>
  ), document.getElementById('root'));
