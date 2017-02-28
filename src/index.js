import React from 'react';
import { render } from 'react-dom';

import store from './store';
import { App } from './app';

if ('serviceWorker' in navigator && process.env.NODE_ENV !== 'development') {
  navigator.serviceWorker.register('service-worker.js');
}

render(<App store={store} />, document.getElementById('root'));
