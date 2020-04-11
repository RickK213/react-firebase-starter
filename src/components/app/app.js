import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import { Navigation } from '../navigation/navigation';
import { ROUTES } from '../../constants/routes';
import { SignUpScreen } from '../screens/auth-screens/sign-up-screen/sign-up-screen';
import { SignInScreen } from '../screens/auth-screens/sign-in-screen/sign-in-screen';
import { HomeScreen } from '../screens/home-screen/home-screen';
import { AccountScreen } from '../screens/account-screen/account-screen';
import { withAuthentication } from '../session';
import { PasswordForgetScreen } from '../screens/auth-screens/password-forget-screen/password-forget-screen';

export const AppComponent = () => {
  return (
    <div
      style={{
        fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif'
      }}
    >
      <Router>
        <Navigation />
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
          <Route path={ROUTES.HOME.path}>
            <HomeScreen />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export const App = withAuthentication(AppComponent);
