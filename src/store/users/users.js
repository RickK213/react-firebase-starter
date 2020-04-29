import { createAction, handleActions } from 'redux-actions';

// Actions
export const REDUCER_PREFIX = 'users';
export const UPDATE = `${REDUCER_PREFIX}/UPDATE`;
export const RESET = `${REDUCER_PREFIX}/RESET`;
export const UPDATE_USER = `${REDUCER_PREFIX}/UPDATE_USER`;

// Action Creators
export const updateUsers = createAction(UPDATE);
export const resetUsers = createAction(RESET);
export const updateUser = createAction(UPDATE_USER);

// Default State
export const DEFAULT_STATE = [];

// Reducer
export const usersReducer = handleActions(
  {
    [UPDATE]: (state, { payload: users }) => [...DEFAULT_STATE, ...users],
    [UPDATE_USER]: (state, { payload: { user, uid } }) => {
      const userIndex = state.findIndex(
        existingUser => existingUser.uid === uid
      );
      const updatedState = [...state];
      updatedState.splice(userIndex, 1, { ...user, uid });
      return updatedState;
    },
    [RESET]: () => [...DEFAULT_STATE]
  },
  DEFAULT_STATE
);

// Selectors
export const selectUsers = (state = {}) =>
  state[REDUCER_PREFIX] || DEFAULT_STATE;
// export const selectSampleValue = state =>
//   selectAuthUser(state).value || DEFAULT_STATE.value;

// Thunks
