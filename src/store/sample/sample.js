import { createAction, handleActions } from 'redux-actions';

// Actions
export const REDUCER_PREFIX = 'sample';
export const UPDATE = `${REDUCER_PREFIX}/UPDATE`;
export const RESET = `${REDUCER_PREFIX}/RESET`;

// Action Creators
export const updateSampleValue = createAction(UPDATE);
export const resetSample = createAction(RESET);

// Default State
export const DEFAULT_STATE = {
  value: 'testValue'
};

// Reducer
export const sampleReducer = handleActions(
  {
    [UPDATE]: (state, { payload: value }) => ({ ...state, value }),
    [RESET]: () => ({ ...DEFAULT_STATE })
  },
  DEFAULT_STATE
);

// Selectors
export const selectSample = (state = {}) =>
  state[REDUCER_PREFIX] || DEFAULT_STATE;
export const selectSampleValue = state =>
  selectSample(state).value || DEFAULT_STATE.value;

// Thunks
