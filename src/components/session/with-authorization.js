import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withFirebase } from '../firebase';
import { ROUTES } from '../../constants/routes';
import { selectAuthUser } from '../../store/auth-user/auth-user';

export const withAuthorization = condition => Component => {
  class WithAuthorization extends React.Component {
    static propTypes = {
      firebase: PropTypes.object,
      history: PropTypes.object
    };

    static defaultProps = {
      firebase: {},
      history: null
    };

    componentDidMount() {
      const { firebase, history } = this.props;

      // firebase.onAuthUserListener takes in 'next' and 'fallback' functions:
      this.authListener = firebase.onAuthUserListener(
        authUser => {
          if (!condition(authUser)) {
            history.push(ROUTES.SIGN_IN.path);
          }
        },
        () => history.push(ROUTES.SIGN_IN.path)
      );
    }

    componentWillUnmount() {
      this.authListener();
    }

    render() {
      return <Component {...this.props} />;
    }
  }

  const mapStateToProps = state => ({
    authUser: selectAuthUser(state)
  });

  return compose(
    withRouter,
    withFirebase,
    connect(mapStateToProps)
  )(WithAuthorization);
};
