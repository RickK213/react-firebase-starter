import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';

export const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to={ROUTES.HOME.path}>{ROUTES.HOME.label}</Link>
        </li>
        <li>
          <Link to={ROUTES.ACCOUNT.path}>{ROUTES.ACCOUNT.label}</Link>
        </li>
      </ul>
    </nav>
  );
};
