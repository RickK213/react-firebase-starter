import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { App } from '../app/app';
import { Navigation } from '../navigation/navigation';
import { ROUTES } from '../../constants/routes';
import { AccountScreen } from '../screens/account-screen/account-screen';
import { HomeScreen } from '../screens/home-screen/home-screen';

export const Root = () => (
  <Router>
    <App>
      <Navigation />
      <Switch>
        <Route path={ROUTES.ACCOUNT.path}>
          <AccountScreen />
        </Route>
        <Route path={ROUTES.HOME.path}>
          <HomeScreen />
        </Route>
      </Switch>
    </App>
  </Router>
);
