import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../../../../firebase/index';
import { inputStyle, buttonStyle, formStyle } from '../../auth-screen-styles';

const INITIAL_STATE = {
  email: '',
  error: null
};

export class PasswordForgetFormComponent extends Component {
  static propTypes = {
    firebase: PropTypes.object
  };

  static defaultProps = {
    firebase: null
  };

  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };

    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  handleOnChange(event) {
    if (!event) return;
    this.setState({ [event.target.name]: event.target.value });
  }

  handleOnSubmit(event) {
    const { email } = this.state;
    const { firebase } = this.props;

    firebase
      .doPasswordReset(email)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  }

  render() {
    const { email, error } = this.state;

    const isInvalid = email === '';

    return (
      <form onSubmit={this.handleOnSubmit} style={formStyle} autoComplete="off">
        <input
          autoComplete="off"
          name="email"
          type="email"
          value={email}
          onChange={this.handleOnChange}
          placeholder="Email Address"
          style={inputStyle}
        />
        <button disabled={isInvalid} type="submit" style={buttonStyle}>
          Reset My Password
        </button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

export const PasswordForgetForm = withRouter(
  withFirebase(PasswordForgetFormComponent)
);
