import React from 'react';
import PropTypes from 'prop-types';
import { AuthUserContext } from '../../../session';
import { PasswordChangeForm } from './password-change-form/password-change-form';

export const AccountScreenComponent = props => {
  const { authUser } = props;
  const emailLabel = authUser ? authUser.email : '';

  return (
    <div>
      <h2>Account</h2>
      <p style={{ marginBottom: '1.5rem' }}>
        <strong>Email Address:</strong>
        <span style={{ marginLeft: '.5rem' }}>{emailLabel}</span>
      </p>
      <p>
        <strong>Change Password:</strong>
      </p>
      <PasswordChangeForm />
    </div>
  );
};

AccountScreenComponent.propTypes = {
  authUser: PropTypes.object
};

AccountScreenComponent.defaultProps = {
  authUser: null
};

export const AccountScreen = () => (
  <div>
    <AuthUserContext.Consumer>
      {authUser => <AccountScreenComponent authUser={authUser} />}
    </AuthUserContext.Consumer>
  </div>
);
