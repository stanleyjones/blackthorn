import React from 'react';
import { applyMiddleware, createStore } from 'redux';
import { render } from 'react-dom';

import Root from './root';
import root from './reducer';
import { logger, thunk } from './middleware';

const store = createStore(root, applyMiddleware(logger, thunk));

render(<Root store={store} />, document.getElementById('root'));
