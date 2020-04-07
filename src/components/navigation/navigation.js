import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ROUTES } from '../../constants/routes';
import { SignOutButton } from '../screens/auth-screens/sign-out-button/sign-out-button';

const listStyle = {
  listStyleType: 'none',
  margin: 0,
  padding: 0,
  overflow: 'hidden'
};

const listItemStyle = {
  float: 'left'
};

const linkStyle = {
  display: 'block',
  textAlign: 'center',
  padding: '.5rem 1rem'
};

export const Navigation = props => {
  const { authUser } = props;

  return (
    <React.Fragment>
      <nav style={{ display: 'flex', justifyContent: 'space-between' }}>
        <ul style={listStyle}>
          <li style={listItemStyle}>
            <Link style={linkStyle} to={ROUTES.HOME.path}>
              {ROUTES.HOME.label}
            </Link>
          </li>
          {!authUser && (
            <React.Fragment>
              <li style={listItemStyle}>
                <Link style={linkStyle} to={ROUTES.SIGN_UP.path}>
                  {ROUTES.SIGN_UP.label}
                </Link>
              </li>
              <li style={listItemStyle}>
                <Link style={linkStyle} to={ROUTES.SIGN_IN.path}>
                  {ROUTES.SIGN_IN.label}
                </Link>
              </li>
            </React.Fragment>
          )}
        </ul>
        {authUser && (
          <div>
            <Link to={ROUTES.ACCOUNT.path} style={{ marginRight: '.5rem' }}>
              {authUser.email}
            </Link>
            <SignOutButton />
          </div>
        )}
      </nav>
      <hr />
    </React.Fragment>
  );
};

Navigation.propTypes = {
  authUser: PropTypes.object
};

Navigation.defaultProps = {
  authUser: null
};
