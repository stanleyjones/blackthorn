import React, { PropTypes } from 'react';
import { Route, Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';

import CampaignList from './campaigns/containers/CampaignList';
import UserLogin from './user/containers/UserLogin';
import { authenticate } from './user/helpers';

const notFound = () => <div>404</div>;

const Root = ({ store }) => (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/login" component={UserLogin} />
      <Route path="/" component={CampaignList} onEnter={authenticate} />
      <Route path="*" component={notFound} />
    </Router>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object,
};

export default Root;
