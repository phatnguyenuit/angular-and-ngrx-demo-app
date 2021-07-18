import { combineReducers } from '@ngrx/store';
import { reducer as spinnerReducer } from '../event/state/reducer';

export const reducers = {
  spinner: spinnerReducer,
};

const rootReducer = combineReducers(reducers);
export type RootState = ReturnType<typeof rootReducer>;
