import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withFirebase } from '../firebase';
import { buttonStyle } from '../screens/auth-screens/auth-screen-styles';
import { selectAuthUser } from '../../store/auth-user/auth-user';

export const withEmailVerification = Component => {
  class WithEmailVerification extends React.Component {
    static propTypes = {
      authUser: PropTypes.object,
      firebase: PropTypes.object
    };

    static defaultProps = {
      authUser: {},
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
      const { authUser } = this.props;
      const { isSent } = this.state;

      const userNeedsEmailVerification = WithEmailVerification.needsEmailVerification(
        authUser
      );

      if (userNeedsEmailVerification) {
        return (
          <div>
            {isSent ? (
              <div>
                <h2>E-Mail Confirmation Sent</h2>
                <p>
                  Check your E-Mail (including your Spam folder) for a
                  confirmation E-Mail. Refresh this page once you have confirmed
                  your E-Mail address.
                </p>
              </div>
            ) : (
              <div>
                <h2>Verify your E-Mail</h2>
                <p>
                  Check your E-Mail (including your Spam folder) for a
                  confirmation E-Mail or send another confirmation E-Mail.
                </p>
              </div>
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
        );
      }
      return <Component {...this.props} />;
    }
  }

  const mapStateToProps = state => ({
    authUser: selectAuthUser(state)
  });

  return compose(withFirebase, connect(mapStateToProps))(WithEmailVerification);
};
