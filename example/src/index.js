import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';

import { configureUrlQuery, createUrlQueryMiddleware } from '../../lib';

import rootReducer from './state/rootReducer';
import urlQueryReducer from './state/urlQueryReducer';
import App from './App';
import history from './history';

// link the history used in our app to url-query so it can update the URL with it.
// do not auto generate change handlers since we won't be using them, we'll use
// those we create in mapDispatchToProps
configureUrlQuery({ history, addChangeHandlers: false });

const urlQueryMiddleware = createUrlQueryMiddleware(urlQueryReducer);

const middlewares = [
  urlQueryMiddleware,
];

const enhancers = [
  applyMiddleware(...middlewares),
];

// If Redux DevTools Extension is installed use it, otherwise use Redux compose
/* eslint-disable no-underscore-dangle */
const composeEnhancers =
  process.env.NODE_ENV !== 'production' &&
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;
/* eslint-enable */

const store = createStore(
  rootReducer,
  undefined,
  composeEnhancers(...enhancers),
);


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
