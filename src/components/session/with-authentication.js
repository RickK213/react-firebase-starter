import React from 'react';
import PropTypes from 'prop-types';
import { withFirebase } from '../firebase';
import AuthUserContext from './context';

export const withAuthentication = Component => {
  class WithAuthentication extends React.Component {
    static propTypes = {
      firebase: PropTypes.object
    };

    static defaultProps = {
      firebase: {}
    };

    constructor(props) {
      super(props);
      this.state = { authUser: JSON.parse(localStorage.getItem('authUser')) };

      const today = new Date();
      const options = { weekday: 'long' };
      this.currentDayOfWeek = new Intl.DateTimeFormat('en-US', options).format(
        today
      );
    }

    componentDidMount() {
      const { firebase } = this.props;

      // firebase.onAuthUserListener takes in 'next' and 'fallback' functions:
      this.authListener = firebase.onAuthUserListener(
        authUser => {
          localStorage.setItem('authUser', JSON.stringify(authUser));
          this.setState({ authUser });
        },
        () => {
          localStorage.removeItem('authUser');
          this.setState({ authUser: null });
        }
      );
    }

    componentWillUnmount() {
      this.authListener();
    }

    render() {
      const { authUser } = this.state;
      return (
        <AuthUserContext.Provider value={authUser}>
          <Component {...this.props} authUser={authUser} />
        </AuthUserContext.Provider>
      );
    }
  }

  return withFirebase(WithAuthentication);
};
