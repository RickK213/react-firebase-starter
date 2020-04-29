import { createAction, handleActions } from 'redux-actions';

// Actions
export const REDUCER_PREFIX = 'toDos';
export const UPDATE = `${REDUCER_PREFIX}/UPDATE`;
export const RESET = `${REDUCER_PREFIX}/RESET`;

// Action Creators
export const updateToDos = createAction(UPDATE);
export const resetToDos = createAction(RESET);

// Default State
export const DEFAULT_STATE = [];

// Reducer
export const toDosReducer = handleActions(
  {
    [UPDATE]: (state, { payload: toDos }) => [...DEFAULT_STATE, ...toDos],
    [RESET]: () => [...DEFAULT_STATE]
  },
  DEFAULT_STATE
);

// Selectors
export const selectToDos = (state = {}) =>
  state[REDUCER_PREFIX] || DEFAULT_STATE;

// Thunks
