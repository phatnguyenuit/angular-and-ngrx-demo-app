import { createReducer, on } from '@ngrx/store';
import * as actions from './actions';
import { SpinnerState } from './types';

const initialState: SpinnerState = false;

export const reducer = createReducer(
  initialState,
  on(actions.startSpinner, () => true),
  on(actions.stopSpinner, () => false)
);
