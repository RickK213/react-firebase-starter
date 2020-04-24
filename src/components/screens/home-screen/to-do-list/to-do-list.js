import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withFirebase } from '../../../firebase';
import {
  inputStyle,
  cellStyle,
  buttonStyle
} from '../../auth-screens/auth-screen-styles';

export class ToDoListComponent extends Component {
  static propTypes = {
    authUser: PropTypes.object,
    firebase: PropTypes.object
  };

  static defaultProps = {
    authUser: {},
    firebase: {}
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      toDos: []
    };
    this.handleUpdateName = this.handleUpdateName.bind(this);
    this.handleDeleteToDo = this.handleDeleteToDo.bind(this);
    this.handleToggleIsComplete = this.handleToggleIsComplete.bind(this);
  }

  componentDidMount() {
    const { firebase } = this.props;
    this.setState({ isLoading: true });
    this.unsubscribe = firebase.toDos().onSnapshot(snapshot => {
      if (snapshot.size) {
        const toDos = [];
        snapshot.forEach(doc => {
          toDos.push({ ...doc.data(), uid: doc.id });
        });
        this.setState({ toDos, isLoading: false });
      } else {
        this.setState({ toDos: [], isLoading: false });
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  handleUpdateName(name, uid) {
    const { firebase } = this.props;
    firebase.toDo(uid).update({ name });
  }

  handleToggleIsComplete(isComplete, uid) {
    const { firebase } = this.props;
    firebase.toDo(uid).update({ isComplete });
  }

  handleDeleteToDo(event, uid) {
    const { firebase } = this.props;
    firebase.toDo(uid).delete();
  }

  renderToDos() {
    const { authUser } = this.props;
    const { toDos } = this.state;
    const toDoRows = toDos.map(toDo => {
      const { name, isComplete, uid, userId } = toDo;
      const { uid: authUserUid } = authUser;
      const disabled = authUserUid !== userId;

      return (
        <tr key={uid}>
          <td style={cellStyle}>
            <input
              disabled={disabled}
              type="text"
              value={name}
              onChange={event =>
                // eslint-disable-next-line prettier/prettier
              this.handleUpdateName(event.target.value, uid)}
              style={{
                ...inputStyle,
                width: 'auto',
                display: 'inline',
                margin: 0,
                cursor: disabled ? 'not-allowed' : 'auto'
              }}
            />
          </td>
          <td style={{ ...cellStyle, textAlign: 'center' }}>
            <input
              disabled={disabled}
              type="checkbox"
              checked={isComplete}
              onChange={event =>
                // eslint-disable-next-line prettier/prettier
              this.handleToggleIsComplete(event.target.checked, uid)}
              style={{
                cursor: disabled ? 'not-allowed' : 'auto'
              }}
            />
          </td>
          <td style={cellStyle}>
            <button
              disabled={disabled}
              type="button"
              onClick={event => this.handleDeleteToDo(event, uid)}
              style={{
                ...buttonStyle,
                background: 'red',
                color: 'white',
                border: 'none',
                cursor: disabled ? 'not-allowed' : 'auto'
              }}
            >
              Delete
            </button>
          </td>
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
            <th style={cellStyle}>Name</th>
            <th style={{ ...cellStyle, textAlign: 'center' }}>Completed</th>
            <th style={cellStyle}>Action</th>
          </tr>
        </thead>
        <tbody>{toDoRows}</tbody>
      </table>
    );
  }

  render() {
    const { isLoading, toDos } = this.state;
    const toDosTable = this.renderToDos();
    const toDosExist = toDos.length > 0;

    return (
      <div>
        {isLoading && <p>Loading...</p>}
        {toDosExist ? (
          <div>{toDosTable}</div>
        ) : (
          <p>
            <em>No To Dos found.</em>
          </p>
        )}
      </div>
    );
  }
}

export const ToDoList = withFirebase(ToDoListComponent);
