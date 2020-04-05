import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { App } from '../app/app';
import { Navigation } from '../navigation/navigation';
import { ROUTES } from '../../constants/routes';
import { AccountScreen } from '../screens/account-screen/account-screen';
import { HomeScreen } from '../screens/home-screen/home-screen';
import Firebase, { FirebaseContext } from '../firebase';
import { SignUpScreen } from '../screens/auth-screens/sign-up-screen/sign-up-screen';
import { SignInScreen } from '../screens/auth-screens/sign-in-screen/sign-in-screen';

export const Root = () => (
  <FirebaseContext.Provider value={new Firebase()}>
    <Router>
      <App>
        <Navigation />
        <Switch>
          <Route path={ROUTES.SIGN_UP.path}>
            <SignUpScreen />
          </Route>
          <Route path={ROUTES.SIGN_IN.path}>
            <SignInScreen />
          </Route>
          <Route path={ROUTES.ACCOUNT.path}>
            <AccountScreen />
          </Route>
          <Route path={ROUTES.HOME.path}>
            <HomeScreen />
          </Route>
        </Switch>
      </App>
    </Router>
  </FirebaseContext.Provider>
);
