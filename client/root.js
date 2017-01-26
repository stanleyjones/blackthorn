import React from 'react';
import { Link, Route, Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';

import CampaignList from './campaigns/containers/CampaignList';
import { authenticate } from './user/helpers';

const logIn = () => <div>Logged In. <Link to="/logout">Log Out</Link></div>;
const logOut = () => <div>Logged Out. <Link to="/login">Log In</Link></div>;
const notFound = () => <div>404</div>;

const Root = ({ store }) => (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/login" component={logIn} />
      <Route path="/logout" component={logOut} />
      <Route path="/" component={CampaignList} onEnter={authenticate} />
      <Route path="*" component={notFound} />
    </Router>
  </Provider>
);

export default Root;
