import React from 'react';
import { applyMiddleware, createStore } from 'redux';
import { render } from 'react-dom';

import Root from './root';
import root from './reducer';
import { logger, thunk } from './middleware';
import { authUser } from './user';

const store = createStore(root, applyMiddleware(logger, thunk));
store.dispatch(authUser());

render(<Root store={store} />, document.getElementById('root'));
