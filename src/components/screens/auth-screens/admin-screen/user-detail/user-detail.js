import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withFirebase } from '../../../../firebase';
import { buttonStyle } from '../../auth-screen-styles';

export class UserDetailComponent extends Component {
  static propTypes = {
    firebase: PropTypes.object,
    match: PropTypes.object,
    location: PropTypes.object
  };

  static defaultProps = {
    firebase: {},
    match: { params: {} },
    location: { state: null }
  };

  constructor(props) {
    super(props);
    const { location } = props;

    this.state = { isLoading: false, user: null, ...location.state };

    this.handleSendPasswordReset = this.handleSendPasswordReset.bind(this);
  }

  componentDidMount() {
    const { user } = this.state;
    if (user) return;

    const { firebase } = this.props;

    this.setState({ isLoading: true });

    const userId = this.getUserId();
    firebase.user(userId).on('value', snapshot => {
      this.setState({ user: snapshot.val(), isLoading: false });
    });
  }

  componentWillUnmount() {
    const { firebase } = this.props;
    const userId = this.getUserId();
    firebase.user(userId).off();
  }

  getUserId() {
    const { match } = this.props;

    const { id } = match.params;
    return id;
  }

  handleSendPasswordReset() {
    const { firebase } = this.props;
    const { user } = this.state;

    const { email } = user;
    firebase.doPasswordReset(email);
  }

  render() {
    const { user, isLoading } = this.state;

    if (isLoading) return <span>Loading...</span>;

    if (!isLoading && !user) return <span>User not found.</span>;

    const { email, username, roles } = user;

    const rolesLabel = roles.join(', ');
    const userId = this.getUserId();

    return (
      <div>
        <p>
          <strong>User Details:</strong>
        </p>
        <p>
          User Id:&nbsp;
          <code>{userId}</code>
        </p>
        <p>
          Username:&nbsp;
          <code>{username}</code>
        </p>
        <p>
          Email:&nbsp;
          <code>{email}</code>
        </p>
        <p>
          Roles:&nbsp;
          <code>{rolesLabel}</code>
        </p>
        <p>
          <button
            style={buttonStyle}
            type="button"
            onClick={this.handleSendPasswordReset}
          >
            Send Password Reset
          </button>
        </p>
      </div>
    );
  }
}

export const UserDetail = compose(
  withFirebase,
  withRouter
)(UserDetailComponent);
