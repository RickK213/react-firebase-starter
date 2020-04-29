import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withFirebase } from '../../../firebase';
import {
  inputStyle,
  cellStyle,
  buttonStyle
} from '../../auth-screens/auth-screen-styles';
import { selectToDos, updateToDos } from '../../../../store/toDos/toDos';

export class ToDoListComponent extends Component {
  static propTypes = {
    authUser: PropTypes.object,
    firebase: PropTypes.object,
    toDos: PropTypes.array,
    onUpdateToDos: PropTypes.func
  };

  static defaultProps = {
    authUser: {},
    firebase: {},
    toDos: [],
    onUpdateToDos: () => {}
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    };
    this.handleUpdateName = this.handleUpdateName.bind(this);
    this.handleDeleteToDo = this.handleDeleteToDo.bind(this);
    this.handleToggleIsComplete = this.handleToggleIsComplete.bind(this);
  }

  componentDidMount() {
    const { firebase, onUpdateToDos } = this.props;
    this.setState({ isLoading: true });
    this.unsubscribe = firebase
      .toDos()
      .orderBy('createdAt', 'desc')
      .onSnapshot(snapshot => {
        if (snapshot.size) {
          const toDos = [];
          snapshot.forEach(doc => {
            toDos.push({ ...doc.data(), uid: doc.id });
          });
          onUpdateToDos(toDos);
          this.setState({ isLoading: false });
        } else {
          onUpdateToDos([]);
          this.setState({ isLoading: false });
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
    const { authUser, toDos } = this.props;

    if (!authUser || !toDos) return [];

    const toDoRows = toDos.map(toDo => {
      const { name, isComplete, uid, userId, username } = toDo;
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
          <td style={cellStyle}>
            <span>{username}</span>
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
            <th style={cellStyle}>Created By</th>
            <th style={{ ...cellStyle, textAlign: 'center' }}>Completed</th>
            <th style={cellStyle}>Action</th>
          </tr>
        </thead>
        <tbody>{toDoRows}</tbody>
      </table>
    );
  }

  render() {
    const { toDos } = this.props;
    const { isLoading } = this.state;
    const toDosTable = this.renderToDos();
    const toDoCount = toDos.length;
    const toDosExist = toDoCount > 0;

    return (
      <div>
        {toDosExist && (
          <div>
            <p>
              {isLoading ? <em>Loading...</em> : <em>{toDoCount} results</em>}
            </p>
            {toDosTable}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  toDos: selectToDos(state)
});

const mapDispatchToProps = dispatch => {
  return {
    onUpdateToDos: toDos => dispatch(updateToDos(toDos))
  };
};

export const ToDoList = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withFirebase
)(ToDoListComponent);
