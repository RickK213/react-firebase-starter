import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { find } from 'lodash';
import { withFirebase } from '../../../../firebase';
import { buttonStyle } from '../../auth-screen-styles';
import { selectUsers, updateUser } from '../../../../../store/users/users';

export class UserDetailComponent extends Component {
  static propTypes = {
    firebase: PropTypes.object,
    location: PropTypes.object,
    match: PropTypes.object,
    onUpdateUser: PropTypes.func,
    user: PropTypes.object
  };

  static defaultProps = {
    firebase: {},
    location: { state: null },
    match: { params: {} },
    onUpdateUser: () => {},
    user: null
  };

  constructor(props) {
    super(props);
    const { location } = props;

    this.state = { isLoading: false, ...location.state };

    this.handleSendPasswordReset = this.handleSendPasswordReset.bind(this);
  }

  componentDidMount() {
    const { user, onUpdateUser } = this.props;
    if (user) return;

    const { firebase } = this.props;

    this.setState({ isLoading: true });

    const userId = this.getUserId();
    this.unsubscribe = firebase.user(userId).onSnapshot(snapshot => {
      onUpdateUser({ user: snapshot.data(), uid: userId });
      this.setState({ isLoading: false });
    });
  }

  componentWillUnmount() {
    if (this.unsubscribe) this.unsubscribe();
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
    const { user } = this.props;
    const { isLoading } = this.state;

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

const mapStateToProps = (state, props) => {
  const users = selectUsers(state);
  const userId = props.match.params.id;
  const userToFind = find(users, user => user.uid === userId);

  return {
    user: userToFind
  };
};

const mapDispatchToProps = dispatch => ({
  onUpdateUser: user => dispatch(updateUser(user))
});

export const UserDetail = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withFirebase
)(UserDetailComponent);
