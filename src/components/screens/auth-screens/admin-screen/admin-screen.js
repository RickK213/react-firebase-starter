import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { compose } from 'recompose';
import { withFirebase } from '../../../firebase';
import { withAuthorization } from '../../../session/with-authorization';
import { ROLES } from '../../../../constants/roles';
import { withEmailVerification } from '../../../session';

const cellStyle = {
  border: '1px solid lightGray',
  borderBottom: 'none',
  borderRight: 'none',
  padding: '0.5rem'
};

class AdminScreenComponent extends Component {
  static propTypes = {
    firebase: PropTypes.object
  };

  static defaultProps = {
    firebase: {}
  };

  constructor(props) {
    super(props);

    this.state = { isLoading: false, users: [] };
  }

  componentDidMount() {
    const { firebase } = this.props;
    this.setState({ isLoading: true });

    firebase.users().on('value', snapshot => {
      const usersObject = snapshot.val();

      const users = !isEmpty(usersObject)
        ? Object.keys(usersObject).map(key => ({
            ...usersObject[key],
            uid: key
          }))
        : [];

      this.setState({ isLoading: false, users });
    });
  }

  componentWillUnmount() {
    const { firebase } = this.props;
    firebase.users().off();
  }

  renderUsersTable() {
    const { users } = this.state;

    const userRows = users.map(user => {
      const { email, username, uid, roles } = user;
      const rolesLabel = roles.length
        ? roles.map((role, index) => {
            const label = index + 1 < roles.length ? `${role}, ` : role;
            return <span key={role}>{label}</span>;
          })
        : 'No roles found.';

      return (
        <tr key={uid}>
          <td style={cellStyle}>{email}</td>
          <td style={cellStyle}>{username}</td>
          <td style={cellStyle}>{rolesLabel}</td>
        </tr>
      );
    });

    return (
      <table
        style={{
          textAlign: 'left',
          borderSpacing: 0,
          borderBottom: '1px solid lightGray',
          borderRight: '1px solid lightGray',
          fontSize: '0.9rem'
        }}
      >
        <thead>
          <tr>
            <th style={cellStyle}>Email</th>
            <th style={cellStyle}>Username</th>
            <th style={cellStyle}>Roles</th>
          </tr>
        </thead>
        <tbody>{userRows}</tbody>
      </table>
    );
  }

  render() {
    const { isLoading, users } = this.state;

    const usersTable = this.renderUsersTable();
    const usersExist = Boolean(users.length);

    return (
      <div>
        <h2>Admin</h2>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <React.Fragment>
            <p>
              <strong>Users:</strong>
            </p>
            {usersExist ? (
              usersTable
            ) : (
              <p>
                <em>No users found.</em>
              </p>
            )}
          </React.Fragment>
        )}
      </div>
    );
  }
}

const condition = authUser => authUser && authUser.roles.includes(ROLES.ADMIN);

export const AdminScreen = compose(
  withEmailVerification,
  withAuthorization(condition),
  withFirebase
)(AdminScreenComponent);
