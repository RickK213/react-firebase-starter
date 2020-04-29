import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import AuthUserContext from './context';
import { withFirebase } from '../firebase';
import { buttonStyle } from '../screens/auth-screens/auth-screen-styles';
import { selectAuthUser } from '../../store/auth-user/auth-user';

export const withEmailVerification = Component => {
  class WithEmailVerification extends React.Component {
    static propTypes = {
      firebase: PropTypes.object
    };

    static defaultProps = {
      firebase: {}
    };

    static needsEmailVerification(authUser) {
      return (
        authUser &&
        !authUser.emailVerified &&
        authUser.providerData
          .map(provider => provider.providerId)
          .includes('password')
      );
    }

    constructor(props) {
      super(props);
      this.state = { isSent: false };

      this.handleSendEmailVerification = this.handleSendEmailVerification.bind(
        this
      );
    }

    handleSendEmailVerification() {
      const { firebase } = this.props;
      firebase
        .doSendEmailVerification()
        .then(() => this.setState({ isSent: true }));
    }

    render() {
      const { isSent } = this.state;
      return (
        <AuthUserContext.Consumer>
          {authUser =>
            WithEmailVerification.needsEmailVerification(authUser) ? (
              <div>
                {isSent ? (
                  <React.Fragment>
                    <h2>E-Mail Confirmation Sent</h2>
                    <p>
                      Check your E-Mail (including your Spam folder) for a
                      confirmation E-Mail. Refresh this page once you have
                      confirmed your E-Mail address.
                    </p>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <h2>Verify your E-Mail</h2>
                    <p>
                      Check your E-Mail (including your Spam folder) for a
                      confirmation E-Mail or send another confirmation E-Mail.
                    </p>
                  </React.Fragment>
                )}
                <button
                  disabled={isSent}
                  onClick={this.handleSendEmailVerification}
                  style={buttonStyle}
                  type="button"
                >
                  Send confirmation E-Mail
                </button>
              </div>
            ) : (
              <Component {...this.props} />
              // eslint-disable-next-line prettier/prettier
            )}
        </AuthUserContext.Consumer>
      );
    }
  }

  const mapStateToProps = state => ({
    authUser: selectAuthUser(state)
  });

  return compose(withFirebase, connect(mapStateToProps))(WithEmailVerification);
};
