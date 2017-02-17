import React from 'react';
import { applyMiddleware, compose, createStore } from 'redux';
import { render } from 'react-dom';

import Root from './root';
import root from './reducer';
import { logger, redirect, thunk } from './middleware';

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/* eslint-enable no-underscore-dangle */

const store = createStore(
  root,
  composeEnhancers(applyMiddleware(logger, redirect, thunk)),
);

render(<Root store={store} />, document.getElementById('root'));
