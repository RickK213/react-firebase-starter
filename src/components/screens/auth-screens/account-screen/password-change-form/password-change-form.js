import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../../../../firebase';
import { inputStyle, buttonStyle, formStyle } from '../../auth-screen-styles';

export const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  error: null,
  success: null
};

export class PasswordChangeFormComponent extends Component {
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
    const { passwordOne } = this.state;
    const { firebase } = this.props;

    firebase
      .doPasswordUpdate(passwordOne)
      .then(() => {
        this.setState({
          ...INITIAL_STATE,
          success: { message: 'Your password has been changed.' }
        });
      })
      .catch(error => {
        this.setState({ ...INITIAL_STATE, error });
        throw error;
      });

    event.preventDefault();
  }

  render() {
    const { error, passwordOne, passwordTwo, success } = this.state;

    const isInvalid = passwordOne === '' || passwordOne !== passwordTwo;

    return (
      <form onSubmit={this.handleOnSubmit} style={formStyle} autoComplete="off">
        <input
          autoComplete="off"
          name="passwordOne"
          type="password"
          value={passwordOne}
          onChange={this.handleOnChange}
          placeholder="New Password"
          style={inputStyle}
        />
        <input
          autoComplete="off"
          name="passwordTwo"
          type="password"
          value={passwordTwo}
          onChange={this.handleOnChange}
          placeholder="Confirm New Password"
          style={inputStyle}
        />
        <button disabled={isInvalid} type="submit" style={buttonStyle}>
          Change My Password
        </button>

        {error && <p>{error.message}</p>}
        {success && <p>{success.message}</p>}
      </form>
    );
  }
}

export const PasswordChangeForm = withRouter(
  withFirebase(PasswordChangeFormComponent)
);
