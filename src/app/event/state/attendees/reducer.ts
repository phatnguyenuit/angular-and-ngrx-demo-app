import { createReducer, on } from '@ngrx/store';
import { AttendeesState } from '../types';
import * as actions from './actions';

const initialState: AttendeesState = {
  loading: false,
  attendees: [],
};

export const reducer = createReducer(
  initialState,
  on(actions.loadAttendees, (state) => ({ ...state, loading: true })),
  on(actions.loadAttendeesSuccess, (state, { attendees }) => ({
    ...state,
    attendees,
    loading: false,
    message: undefined,
  })),
  on(actions.loadAttendeesFail, (state, { message }) => ({
    ...state,
    message,
    loading: false,
    attendees: [],
  }))
);
