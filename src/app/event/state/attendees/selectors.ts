import { createSelector } from '@ngrx/store';
import { RootState } from 'app/state/root.reducer';

const selectEventState = (state: RootState) => state.event;

export const selectAttendeesState = createSelector(
  selectEventState,
  (eventState) => eventState.attendees
);
