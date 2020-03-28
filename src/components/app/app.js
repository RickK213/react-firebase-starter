import React from 'react';
import { CHILDREN_PROP_TYPE } from '../../constants/children-prop-type';

export const App = props => {
  const { children } = props;
  return <div>{children}</div>;
};

App.propTypes = {
  children: CHILDREN_PROP_TYPE
};

App.defaultProps = {
  children: null
};
