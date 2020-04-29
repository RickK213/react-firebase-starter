import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import {
  authUserReducer,
  REDUCER_PREFIX as AUTH_USER
} from './auth-user/auth-user';

export const createRootReducer = (history = {}) =>
  combineReducers({
    [AUTH_USER]: authUserReducer,
    router: connectRouter(history)
  });
