import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../../../firebase';
import { ROUTES } from '../../../../constants/routes';
import { buttonStyle } from '../auth-screen-styles';

export class SignOutButtonComponent extends Component {
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
    this.handleOnSignOutClick = this.handleOnSignOutClick.bind(this);
  }

  handleOnSignOutClick() {
    const { firebase, history } = this.props;
    firebase.doSignOut().then(() => {
      history.push(ROUTES.HOME.path);
    });
  }

  render() {
    return (
      <button
        type="button"
        onClick={this.handleOnSignOutClick}
        style={buttonStyle}
      >
        Sign Out
      </button>
    );
  }
}

export const SignOutButton = withRouter(withFirebase(SignOutButtonComponent));
