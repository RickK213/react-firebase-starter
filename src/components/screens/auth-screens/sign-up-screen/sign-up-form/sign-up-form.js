import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../../../../firebase';
import { ROUTES } from '../../../../../constants/routes';
import { inputStyle, buttonStyle, formStyle } from '../../auth-screen-styles';

export const INITIAL_STATE = {
  email: '',
  error: null,
  passwordOne: '',
  passwordTwo: '',
  username: ''
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
    this.handleOnCheckboxChange = this.handleOnCheckboxChange.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  handleOnChange(event) {
    if (!event) return;
    this.setState({ [event.target.name]: event.target.value });
  }

  handleOnCheckboxChange(event) {
    if (!event) return;
    this.setState({ [event.target.name]: event.target.checked });
  }

  handleOnSubmit(event) {
    const { email, passwordOne, username } = this.state;
    const { firebase, history } = this.props;

    firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // Add userername to the user doc in the firestore users/ collection
        // Adding 'merge' option to merge with an existing user doc
        // since we have a cloud function to set up user roles.
        return firebase
          .user(authUser.user.uid)
          .set({ username }, { merge: true });
      })
      .then(() => {
        return firebase.doSendEmailVerification();
      })
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        history.push(ROUTES.ACCOUNT.path);
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
        <div style={{ marginTop: '1rem' }}>
          <button type="submit" disabled={isInvalid} style={buttonStyle}>
            Sign Up
          </button>
        </div>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

export const SignUpForm = withRouter(withFirebase(SignUpFormComponent));
