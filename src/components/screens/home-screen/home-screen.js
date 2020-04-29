import React, { Component } from 'react';
import { compose } from 'recompose';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withEmailVerification, withAuthorization } from '../../session';
import { ToDoList } from './to-do-list/to-do-list';
import { AddToDoForm } from './add-to-do-form/add-to-do-form';
import { selectAuthUser } from '../../../store/auth-user/auth-user';

const daysOfWeek = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];
const currentDay = new Date().getDay();
const dayOfWeek = daysOfWeek[currentDay];

// eslint-disable-next-line react/prefer-stateless-function
export class HomeScreenComponent extends Component {
  static propTypes = {
    authUser: PropTypes.object
  };

  static defaultProps = {
    authUser: {}
  };

  render() {
    const { authUser } = this.props;

    const username = authUser ? authUser.username : '';

    const greeting = `Happy ${dayOfWeek}, ${username}.`;

    return (
      <div>
        <h2>{greeting}</h2>
        <p>This screen is viewable by all authenticated users.</p>
        <h4>To Dos:</h4>
        <AddToDoForm authUser={authUser} />
        <ToDoList authUser={authUser} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  authUser: selectAuthUser(state)
});

const condition = authUser => !!authUser;

export const HomeScreen = compose(
  connect(mapStateToProps),
  withEmailVerification,
  withAuthorization(condition)
)(HomeScreenComponent);
