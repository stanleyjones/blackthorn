import { applyMiddleware, compose, createStore } from 'redux';

import reducer from './reducer';
import { redirect, thunk } from './middleware';

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/* eslint-enable no-underscore-dangle */

export default createStore(
  reducer,
  composeEnhancers(applyMiddleware(redirect, thunk)),
);
