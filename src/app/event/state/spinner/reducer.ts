import { createReducer, on } from '@ngrx/store';
import * as actions from './actions';

export type SpinnerState = boolean;

const initialState: SpinnerState = false;

export const reducer = createReducer(
  initialState,
  on(actions.startSpinner, () => true),
  on(actions.stopSpinner, () => false)
);
