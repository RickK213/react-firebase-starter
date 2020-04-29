import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import {
  // withAuthorization,
  withEmailVerification
} from '../../../session';
import { PasswordChangeForm } from './password-change-form/password-change-form';
import { selectAuthUser } from '../../../../store/auth-user/auth-user';

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

const mapStateToProps = state => ({
  authUser: selectAuthUser(state)
});

// const condition = authUser => !!authUser;

export const AccountScreen = compose(
  connect(mapStateToProps),
  withEmailVerification
  // withAuthorization(condition)
)(AccountScreenComponent);
