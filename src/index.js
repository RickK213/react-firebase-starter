import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import thunk from 'redux-thunk';
import { createStore, compose, applyMiddleware } from 'redux';
import { Root } from './components/root/root';
import { rootReducer } from './store';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

const init = Component =>
  render(
    <AppContainer>
      <Component store={store} />
    </AppContainer>,
    document.getElementById('root')
  );

init(Root);

if (module.hot) {
  module.hot.accept('./components/root/root', () => {
    // eslint-disable-next-line global-require
    const nextRoot = require('./components/root/root').Root;
    init(nextRoot);
  });

  module.hot.accept('./store', () => {
    // eslint-disable-next-line global-require
    const nextRootReducer = require('./store').rootReducer;
    store.replaceReducer(nextRootReducer);
  });
}
