import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { compose } from 'recompose';
import { UserList } from './user-list/user-list';
import { ROUTES } from '../../../../constants/routes';
import { UserDetail } from './user-detail/user-detail';
import { withEmailVerification, withAuthorization } from '../../../session';
import { ROLES } from '../../../../constants/roles';

export const AdminScreenComponent = () => {
  return (
    <div>
      <h2>Admin</h2>
      <Switch>
        <Route path={ROUTES.ADMIN_DETAILS.path} component={UserDetail} />
        <Route path={ROUTES.ADMIN.path} component={UserList} />
      </Switch>
    </div>
  );
};

const condition = authUser => authUser && authUser.roles.includes(ROLES.ADMIN);

export const AdminScreen = compose(
  withEmailVerification,
  withAuthorization(condition)
)(AdminScreenComponent);
