import { Type } from '@angular/core';
import { combineReducers } from '@ngrx/store';
import * as fromAttendees from './attendees/reducer';
import { AttendeesEffects } from './attendees/effects';

export const reducersMap = {
  attendees: fromAttendees.reducer,
};

export const reducer = combineReducers(reducersMap);

export const effects: Type<any>[] = [AttendeesEffects];

export type EventState = ReturnType<typeof reducer>;
