import { createReducer, on } from '@ngrx/store';
import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { Attendee } from '../../models';
import { AttendeesState } from '../types';
import * as actions from './actions';

export const adapter: EntityAdapter<Attendee> = createEntityAdapter<Attendee>();

export const initialState: AttendeesState = adapter.getInitialState({
  loading: false,
  errorMessage: undefined,
});

export const reducer = createReducer(
  initialState,
  on(actions.loadAttendees, (state) =>
    adapter.removeAll({ ...state, loading: true, message: undefined })
  ),
  on(actions.loadAttendeesSuccess, (state, { attendees }) =>
    adapter.addMany(attendees, {
      ...state,
      loading: false,
      message: undefined,
    })
  ),
  on(actions.loadAttendeesFail, (state, { errorMessage }) =>
    adapter.removeAll({ ...state, errorMessage, loading: false })
  ),
  on(actions.addAttendee, (state) => ({
    ...state,
    loading: true,
    message: undefined,
  })),
  on(actions.addAttendeeSuccess, (state, { attendee }) =>
    adapter.addOne(attendee, { ...state, loading: false })
  ),
  on(actions.addAttendeeFail, (state, { errorMessage }) => ({
    ...state,
    errorMessage,
    loading: false,
  })),
  on(actions.filterBy, (state, { filterBy }) => ({ ...state, filterBy }))
);
