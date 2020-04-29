import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withFirebase } from '../firebase';
import { updateAuthUser } from '../../store/auth-user/auth-user';

export const withAuthentication = Component => {
  class WithAuthentication extends React.Component {
    static propTypes = {
      firebase: PropTypes.object,
      onUpdateAuthUser: PropTypes.func
    };

    static defaultProps = {
      firebase: {},
      onUpdateAuthUser: () => {}
    };

    constructor(props) {
      super(props);
      const { onUpdateAuthUser } = props;

      onUpdateAuthUser(JSON.parse(localStorage.getItem('authUser')));

      const today = new Date();
      const options = { weekday: 'long' };
      this.currentDayOfWeek = new Intl.DateTimeFormat('en-US', options).format(
        today
      );
    }

    componentDidMount() {
      const { firebase, onUpdateAuthUser } = this.props;

      // firebase.onAuthUserListener takes in 'next' and 'fallback' functions:
      this.authListener = firebase.onAuthUserListener(
        authUser => {
          localStorage.setItem('authUser', JSON.stringify(authUser));
          onUpdateAuthUser(authUser);
        },
        () => {
          localStorage.removeItem('authUser');
          onUpdateAuthUser(null);
        }
      );
    }

    componentWillUnmount() {
      this.authListener();
    }

    render() {
      return <Component {...this.props} />;
    }
  }

  const mapStateToProps = undefined;

  const mapDispatchToProps = dispatch => ({
    onUpdateAuthUser: authUser => dispatch(updateAuthUser(authUser))
  });

  return compose(
    withFirebase,
    connect(mapStateToProps, mapDispatchToProps)
  )(WithAuthentication);
};
