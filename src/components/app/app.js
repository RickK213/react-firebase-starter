import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import PropTypes from 'prop-types';
import { ConnectedNavigation } from '../navigation/navigation.connected';
import { ROUTES } from '../../constants/routes';
import { SignUpScreen } from '../screens/auth-screens/sign-up-screen/sign-up-screen';
import { SignInScreen } from '../screens/auth-screens/sign-in-screen/sign-in-screen';
import { withAuthentication } from '../session';
import { PasswordForgetScreen } from '../screens/auth-screens/password-forget-screen/password-forget-screen';
import { AdminScreen } from '../screens/auth-screens/admin-screen/admin-screen';
import { HomeScreen } from '../screens/home-screen/home-screen';
import { AccountScreen } from '../screens/auth-screens/account-screen/account-screen';

export const AppComponent = props => {
  const { history } = props;

  return (
    <div
      style={{
        fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif'
      }}
    >
      <ConnectedRouter history={history}>
        <ConnectedNavigation />
        <Switch>
          <Route path={ROUTES.PASSWORD_FORGET.path}>
            <PasswordForgetScreen />
          </Route>
          <Route path={ROUTES.SIGN_IN.path}>
            <SignInScreen />
          </Route>
          <Route path={ROUTES.SIGN_UP.path}>
            <SignUpScreen />
          </Route>
          <Route path={ROUTES.ACCOUNT.path}>
            <AccountScreen />
          </Route>
          <Route path={ROUTES.ADMIN.path}>
            <AdminScreen />
          </Route>
          <Route path={ROUTES.HOME.path}>
            <HomeScreen />
          </Route>
        </Switch>
      </ConnectedRouter>
    </div>
  );
};

AppComponent.propTypes = {
  history: PropTypes.object
};

AppComponent.defaultProps = {
  history: null
};

export const App = withAuthentication(AppComponent);
