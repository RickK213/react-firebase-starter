import React from 'react';
import { Link } from 'react-router-dom';
import { SignInForm } from './sign-in-form/sign-in-form';
import { ROUTES } from '../../../../constants/routes';

export const SignInScreen = () => {
  return (
    <div>
      <h2>Sign In</h2>
      <SignInForm />
      <p>
        <Link to={ROUTES.PASSWORD_FORGET.path}>
          {ROUTES.PASSWORD_FORGET.label}
        </Link>
      </p>
    </div>
  );
};
