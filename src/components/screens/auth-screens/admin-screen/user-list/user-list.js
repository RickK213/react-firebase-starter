import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withFirebase } from '../../../../firebase';
import { ROUTES } from '../../../../../constants/routes';
import { cellStyle } from '../../auth-screen-styles';

class UserListComponent extends Component {
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

    this.unsubscribe = firebase.users().onSnapshot(snapshot => {
      const users = [];
      snapshot.forEach(doc => {
        users.push({ ...doc.data(), uid: doc.id });
      });

      this.setState({ isLoading: false, users });
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  renderUsersTable() {
    const { users } = this.state;

    const userRows = users.map(user => {
      const { email, username, uid, roles } = user;
      const rolesLabel = roles.length ? roles.join(', ') : 'No roles found.';

      return (
        <tr key={uid}>
          <td style={cellStyle}>{email}</td>
          <td style={cellStyle}>
            <Link
              to={{ pathname: `${ROUTES.ADMIN.path}/${uid}`, state: { user } }}
            >
              {username}
            </Link>
          </td>
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

export const UserList = withFirebase(UserListComponent);
