import React from 'react';
import { render } from 'react-dom';

const Root = () => <div>Hello, world!</div>;

const init = Component =>
  render(<Component />, document.getElementsByTagName('body')[0]);

init(Root);
