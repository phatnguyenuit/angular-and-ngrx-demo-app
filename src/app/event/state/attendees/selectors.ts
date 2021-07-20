import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EventState } from '../index';
import { adapter } from './reducer';

export const selectEventState = createFeatureSelector<EventState>('event');

const { selectAll } = adapter.getSelectors();

export const selectAttendeesState = createSelector(
  selectEventState,
  (state) => state.attendees
);

export const selectAttendees = createSelector(selectAttendeesState, selectAll);
