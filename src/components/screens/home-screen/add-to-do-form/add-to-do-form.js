import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withFirebase } from '../../../firebase';
import { buttonStyle, inputStyle } from '../../auth-screens/auth-screen-styles';

export class AddToDoFormComponent extends Component {
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
    this.state = { toDoName: '' };

    this.handleToDoNameChange = this.handleToDoNameChange.bind(this);
    this.handleCreateToDo = this.handleCreateToDo.bind(this);
  }

  handleToDoNameChange(event) {
    if (!event) return;

    const {
      target: { value: toDoName }
    } = event;

    this.setState({ toDoName });
  }

  handleCreateToDo(event) {
    const { authUser, firebase } = this.props;
    const { toDoName } = this.state;
    if (!event || !toDoName) return;

    const { uid } = authUser;

    firebase.toDos().add({ name: toDoName, isComplete: false, userId: uid });

    event.preventDefault();
    this.setState({ toDoName: '' });
  }

  render() {
    const { toDoName } = this.state;

    return (
      <form onSubmit={this.handleCreateToDo} style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          value={toDoName}
          onChange={this.handleToDoNameChange}
          style={{
            ...inputStyle,
            width: 'auto',
            display: 'inline',
            marginRight: '.5rem'
          }}
        />
        <button type="submit" style={buttonStyle}>
          Add
        </button>
      </form>
    );
  }
}

export const AddToDoForm = withFirebase(AddToDoFormComponent);
