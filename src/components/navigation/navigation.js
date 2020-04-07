import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ROUTES } from '../../constants/routes';
import { SignOutButton } from '../screens/auth-screens/sign-out-button/sign-out-button';

export const Navigation = props => {
  const { authUser } = props;

  return (
    <nav>
      <ul>
        <li>
          <Link to={ROUTES.HOME.path}>{ROUTES.HOME.label}</Link>
        </li>
        {authUser ? (
          <React.Fragment>
            <li>
              <Link to={ROUTES.ACCOUNT.path}>{ROUTES.ACCOUNT.label}</Link>
            </li>
            <li>
              <SignOutButton />
            </li>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <li>
              <Link to={ROUTES.SIGN_UP.path}>{ROUTES.SIGN_UP.label}</Link>
            </li>
            <li>
              <Link to={ROUTES.SIGN_IN.path}>{ROUTES.SIGN_IN.label}</Link>
            </li>
          </React.Fragment>
        )}
      </ul>
    </nav>
  );
};

Navigation.propTypes = {
  authUser: PropTypes.object
};

Navigation.defaultProps = {
  authUser: null
};
