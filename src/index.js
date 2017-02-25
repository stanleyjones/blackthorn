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

if ('serviceWorker' in navigator && process.env.NODE_ENV !== 'development') {
  navigator.serviceWorker.register('./service-worker.js')
    .then((reg) => { console.info('Registered ServiceWorker', reg); })
    .catch((err) => { console.error('Error registering ServiceWorker', err); });
}

render(<Root store={store} />, document.getElementById('root'));
