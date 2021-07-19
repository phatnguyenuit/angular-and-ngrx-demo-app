import { combineReducers } from '@ngrx/store';
import * as fromSpinner from './spinner/reducer';
import * as fromAttendees from './attendees/reducer';

export const reducersMap = {
  attendees: fromAttendees.reducer,
  spinner: fromSpinner.reducer,
};

export const reducer = combineReducers(reducersMap);

export type EventState = ReturnType<typeof reducer>;
