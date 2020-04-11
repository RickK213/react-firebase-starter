import { combineReducers } from 'redux';
import { sampleReducer, REDUCER_PREFIX as SAMPLE } from './sample/sample';
import {
  authUserReducer,
  REDUCER_PREFIX as AUTH_USER
} from './auth-user/auth-user';

export const rootReducer = combineReducers({
  [AUTH_USER]: authUserReducer,
  [SAMPLE]: sampleReducer
});
