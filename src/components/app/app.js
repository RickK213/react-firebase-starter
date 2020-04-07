import React, { Component } from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Navigation } from '../navigation/navigation';
import { ROUTES } from '../../constants/routes';
import { SignUpScreen } from '../screens/auth-screens/sign-up-screen/sign-up-screen';
import { SignInScreen } from '../screens/auth-screens/sign-in-screen/sign-in-screen';
import { AccountScreen } from '../screens/account-screen/account-screen';
import { HomeScreen } from '../screens/home-screen/home-screen';
import { withFirebase } from '../firebase';

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

    const userIdentifier = authUser ? authUser.email : 'Friend';
    const greeting = `Happy ${this.currentDayOfWeek}, ${userIdentifier}!`;

    return (
      <Router>
        <Navigation authUser={authUser} />
        <h2>{greeting}</h2>
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
      </Router>
    );
  }
}

export const App = withFirebase(AppComponent);
