import { createAction, handleActions } from 'redux-actions';

// Actions
export const REDUCER_PREFIX = 'authUser';
export const UPDATE = `${REDUCER_PREFIX}/UPDATE`;
export const RESET = `${REDUCER_PREFIX}/RESET`;

// Action Creators
export const updateAuthUser = createAction(UPDATE);
export const resetAuthUser = createAction(RESET);

// Default State
export const DEFAULT_STATE = null;

// Reducer
export const authUserReducer = handleActions(
  {
    [UPDATE]: (state, { payload: authUser }) => ({ ...state, value: authUser }),
    [RESET]: () => ({ ...DEFAULT_STATE })
  },
  DEFAULT_STATE
);

// Selectors
export const selectAuthUser = (state = {}) =>
  state[REDUCER_PREFIX] || DEFAULT_STATE;
// export const selectSampleValue = state =>
//   selectAuthUser(state).value || DEFAULT_STATE.value;

// Thunks
