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

export const selectIsLoading = createSelector(
  selectAttendeesState,
  (state) => state.loading
);

export const selectFilterBy = createSelector(
  selectAttendeesState,
  (state) => state.filterBy
);

export const selectFilteredAttendees = createSelector(
  selectAttendees,
  selectFilterBy,
  (attendees, filterBy) =>
    attendees.filter((attendee) => {
      switch (filterBy) {
        case '':
        case 'all': {
          return true;
        }
        case 'withGuests': {
          return attendee.guests > 0;
        }
        case 'withoutGuests': {
          return attendee.guests === 0;
        }
        default:
          return false;
      }
    })
);
