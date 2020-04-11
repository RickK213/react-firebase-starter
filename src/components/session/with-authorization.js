import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../firebase';
import { ROUTES } from '../../constants/routes';
import AuthUserContext from './context';

export const withAuthorization = condition => Component => {
  class WithAuthentication extends React.Component {
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

      this.authListener = firebase.auth.onAuthStateChanged(authUser => {
        if (!condition(authUser)) {
          history.push(ROUTES.SIGN_IN.path);
        }
      });
    }

    componentWillUnmount() {
      this.authListener();
    }

    render() {
      return (
        <AuthUserContext.Consumer>
          {authUser =>
            condition(authUser) ? <Component {...this.props} /> : null
          // eslint-disable-next-line react/jsx-curly-newline
          }
        </AuthUserContext.Consumer>
      );
    }
  }

  return withRouter(withFirebase(WithAuthentication));
};
