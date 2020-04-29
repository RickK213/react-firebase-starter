import React from 'react';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import { App } from '../app/app';
import Firebase, { FirebaseContext } from '../firebase';

export const Root = props => {
  const { history, store } = props;

  return (
    <Provider store={store}>
      <FirebaseContext.Provider value={new Firebase()}>
        <App history={history} />
      </FirebaseContext.Provider>
    </Provider>
  );
};

Root.propTypes = {
  history: PropTypes.object,
  store: PropTypes.object
};

Root.defaultProps = {
  history: {},
  store: {}
};
