import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withFirebase } from '../../../firebase';

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

      const users = Object.keys(usersObject).map(key => ({
        ...usersObject[key],
        uid: key
      }));

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
      const { email, username, uid } = user;

      return (
        <tr key={uid}>
          <td style={cellStyle}>{email}</td>
          <td style={cellStyle}>{username}</td>
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
        <tr>
          <th style={cellStyle}>Email</th>
          <th style={cellStyle}>Username</th>
        </tr>
        {userRows}
      </table>
    );
  }

  render() {
    const { isLoading } = this.state;

    const usersTable = this.renderUsersTable();

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
            {usersTable}
          </React.Fragment>
        )}
      </div>
    );
  }
}

export const AdminScreen = withFirebase(AdminScreenComponent);
