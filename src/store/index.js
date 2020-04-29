import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import {
  authUserReducer,
  REDUCER_PREFIX as AUTH_USER
} from './auth-user/auth-user';
import { usersReducer, REDUCER_PREFIX as USERS } from './users/users';
import { toDosReducer, REDUCER_PREFIX as TO_DOS } from './toDos/toDos';

export const createRootReducer = (history = {}) =>
  combineReducers({
    [AUTH_USER]: authUserReducer,
    [TO_DOS]: toDosReducer,
    [USERS]: usersReducer,
    router: connectRouter(history)
  });
