import React, { Component } from 'react';
import { compose } from 'recompose';
import PropTypes from 'prop-types';
import { name, version } from '../../../../package.json';
import {
  AuthUserContext,
  withAuthorization,
  withEmailVerification
} from '../../session';
import { ToDoList } from './to-do-list/to-do-list';
import { AddToDoForm } from './add-to-do-form/add-to-do-form';

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
    authUser: null
  };

  render() {
    const { authUser = {} } = this.props;

    const { username } = authUser;

    const greeting = `Happy ${dayOfWeek}, ${username}.`;

    return (
      <div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '20px'
          }}
        >
          <h2 style={{ marginTop: 0 }}>{greeting}</h2>
          <code style={{ textAlign: 'right' }}>
            {name}
            {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
            <br />v{version}
          </code>
        </div>
        <p>This screen is viewable by all authenticated users.</p>
        <h4>To Dos:</h4>
        <AddToDoForm />
        <ToDoList />
      </div>
    );
  }
}

const HomeScreenWithContext = () => (
  <div>
    <AuthUserContext.Consumer>
      {authUser => <HomeScreenComponent authUser={authUser} />}
    </AuthUserContext.Consumer>
  </div>
);

const condition = authUser => !!authUser;

export const HomeScreen = compose(
  withEmailVerification,
  withAuthorization(condition)
)(HomeScreenWithContext);
