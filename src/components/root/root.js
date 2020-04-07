import React from 'react';
import { Provider } from 'react-redux';
import { App } from '../app/app';
import Firebase, { FirebaseContext } from '../firebase';

export const Root = props => {
  const { store } = props;

  return (
    <Provider store={store}>
      <FirebaseContext.Provider value={new Firebase()}>
        <App />
      </FirebaseContext.Provider>
    </Provider>
  );
};

Root.propTypes = {
  store: Provider.propTypes.store
};

Root.defaultProps = {
  store: {}
};
