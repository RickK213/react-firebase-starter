import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import { SignOutButton } from '../screens/auth-screens/sign-out-button/sign-out-button';

export const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to={ROUTES.HOME.path}>{ROUTES.HOME.label}</Link>
        </li>
        <li>
          <Link to={ROUTES.SIGN_UP.path}>{ROUTES.SIGN_UP.label}</Link>
        </li>
        <li>
          <Link to={ROUTES.SIGN_IN.path}>{ROUTES.SIGN_IN.label}</Link>
        </li>
        <li>
          <Link to={ROUTES.ACCOUNT.path}>{ROUTES.ACCOUNT.label}</Link>
        </li>
        <li>
          <SignOutButton />
        </li>
      </ul>
    </nav>
  );
};
