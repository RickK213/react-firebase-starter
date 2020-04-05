import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { ROUTES } from '../../../../../constants/routes';
import { withFirebase } from '../../../../firebase/index';

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null
};

export class SignInFormComponent extends Component {
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
    this.state = { ...INITIAL_STATE };

    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  handleOnChange(event) {
    if (!event) return;
    this.setState({ [event.target.name]: event.target.value });
  }

  handleOnSubmit(event) {
    const { email, password } = this.state;
    const { firebase, history } = this.props;

    firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(authenticatedUser => {
        // eslint-disable-next-line no-console
        console.log('authenticatedUser', authenticatedUser);
        this.setState({ ...INITIAL_STATE });
        history.push(ROUTES.HOME.path);
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  }

  render() {
    const { email, error, password } = this.state;

    const isInvalid = email === '' || password === '';

    return (
      <form onSubmit={this.handleOnSubmit}>
        <input
          name="email"
          type="email"
          value={email}
          onChange={this.handleOnChange}
          placeholder="Email Address"
        />
        <input
          name="password"
          type="password"
          value={password}
          onChange={this.handleOnChange}
          placeholder="Password"
        />
        <button disabled={isInvalid} type="submit">
          Sign In
        </button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

export const SignInForm = withRouter(withFirebase(SignInFormComponent));
