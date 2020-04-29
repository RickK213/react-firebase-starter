import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import {
  authUserReducer,
  REDUCER_PREFIX as AUTH_USER
} from './auth-user/auth-user';
import { usersReducer, REDUCER_PREFIX as USERS } from './users/users';

export const createRootReducer = (history = {}) =>
  combineReducers({
    [AUTH_USER]: authUserReducer,
    [USERS]: usersReducer,
    router: connectRouter(history)
  });
