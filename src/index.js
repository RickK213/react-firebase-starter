import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Root } from './components/root/root';

const init = Component =>
  render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementsByTagName('body')[0]
  );

init(Root);

if (module.hot) {
  module.hot.accept('./components/root/root', () => {
    // eslint-disable-next-line global-require
    const nextRoot = require('./components/root/root').Root;
    init(nextRoot);
  });
}
