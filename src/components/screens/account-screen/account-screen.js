import React from 'react';

export const AccountScreen = props => {
  const { authUser } = props;
  const emailLabel = authUser ? authUser.email : '';

  return (
    <div>
      <h2>Account</h2>
      <p>
        <strong>Email Address:</strong>
        <span style={{ marginLeft: '.5rem' }}>{emailLabel}</span>
      </p>
    </div>
  );
};
