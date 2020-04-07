import React, { Component } from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Navigation } from '../navigation/navigation';
import { ROUTES } from '../../constants/routes';
import { SignUpScreen } from '../screens/auth-screens/sign-up-screen/sign-up-screen';
import { SignInScreen } from '../screens/auth-screens/sign-in-screen/sign-in-screen';
import { HomeScreen } from '../screens/home-screen/home-screen';
import { withFirebase } from '../firebase';
import { AccountScreen } from '../screens/account-screen/account-screen';

export class AppComponent extends Component {
  static propTypes = {
    firebase: PropTypes.object
  };

  static defaultProps = {
    firebase: {}
  };

  constructor(props) {
    super(props);
    this.state = { authUser: null };

    const today = new Date();
    const options = { weekday: 'long' };
    this.currentDayOfWeek = new Intl.DateTimeFormat('en-US', options).format(
      today
    );
  }

  componentDidMount() {
    const { firebase } = this.props;

    this.authListener = firebase.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.setState({ authUser });
      } else {
        this.setState({ authUser: null });
      }
    });
  }

  componentWillUnmount() {
    this.authListener();
  }

  render() {
    const { authUser } = this.state;

    return (
      <div
        style={{
          fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif'
        }}
      >
        <Router>
          <Navigation authUser={authUser} />
          <Switch>
            <Route path={ROUTES.ACCOUNT.path}>
              <AccountScreen authUser={authUser} />
            </Route>
            <Route path={ROUTES.SIGN_UP.path}>
              <SignUpScreen />
            </Route>
            <Route path={ROUTES.SIGN_IN.path}>
              <SignInScreen />
            </Route>
            <Route path={ROUTES.HOME.path}>
              <HomeScreen />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export const App = withFirebase(AppComponent);
