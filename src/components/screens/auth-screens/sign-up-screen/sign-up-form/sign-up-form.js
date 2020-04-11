import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../../../../firebase';
import { ROUTES } from '../../../../../constants/routes';
import { inputStyle, buttonStyle, formStyle } from '../../auth-screen-styles';

export const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null
};

export class SignUpFormComponent extends Component {
  static propTypes = {
    firebase: PropTypes.object,
    history: PropTypes.object
  };

  static defaultProps = {
    firebase: null,
    history: null
  };

  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  handleOnChange(event) {
    if (!event) return;
    this.setState({ [event.target.name]: event.target.value });
  }

  handleOnSubmit(event) {
    const { email, passwordOne } = this.state;
    const { firebase, history } = this.props;
    firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        history.push(ROUTES.HOME.path);
      })
      .catch(error => {
        this.setState({ error });
        throw error;
      });
    event.preventDefault();
  }

  render() {
    const { email, error, passwordOne, passwordTwo, username } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';

    return (
      <form onSubmit={this.handleOnSubmit} style={formStyle}>
        <input
          name="username"
          onChange={this.handleOnChange}
          placeholder="Username"
          style={inputStyle}
          type="text"
          value={username}
        />
        <input
          name="email"
          onChange={this.handleOnChange}
          placeholder="Email Address"
          style={inputStyle}
          type="email"
          value={email}
        />
        <input
          name="passwordOne"
          onChange={this.handleOnChange}
          placeholder="Password"
          style={inputStyle}
          type="password"
          value={passwordOne}
        />
        <input
          name="passwordTwo"
          onChange={this.handleOnChange}
          placeholder="Confirm Password"
          style={inputStyle}
          type="password"
          value={passwordTwo}
        />

        <button type="submit" disabled={isInvalid} style={buttonStyle}>
          Sign Up
        </button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

export const SignUpForm = withRouter(withFirebase(SignUpFormComponent));
