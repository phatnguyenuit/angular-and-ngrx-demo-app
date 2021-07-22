import { createAction, props } from '@ngrx/store';
import { Attendee } from '../../models';

export enum AttendeeActions {
  loadAttendees = '[ATTENDEES] LOAD',
  loadAttendeesSuccess = '[ATTENDEES] LOAD SUCCESS',
  loadAttendeesFail = '[ATTENDEES] LOAD FAILED',
  addAttendee = '[ATTENDEES] ADD',
  addAttendeeSuccess = '[ATTENDEES] ADD SUCCESS',
  addAttendeeFail = '[ATTENDEES] ADD FAILED',
  filterBy = '[ATTENDEES] FILTER BY',
}

export const loadAttendees = createAction(AttendeeActions.loadAttendees);
export const loadAttendeesSuccess = createAction(
  AttendeeActions.loadAttendeesSuccess,
  props<{ attendees: Attendee[] }>()
);
export const loadAttendeesFail = createAction(
  AttendeeActions.loadAttendeesFail,
  props<{ errorMessage: string }>()
);

export const addAttendee = createAction(
  AttendeeActions.addAttendee,
  props<{ payload: Attendee }>()
);
export const addAttendeeSuccess = createAction(
  AttendeeActions.addAttendeeSuccess,
  props<{ attendee: Attendee }>()
);
export const addAttendeeFail = createAction(
  AttendeeActions.addAttendeeFail,
  props<{ errorMessage: string }>()
);

export const filterBy = createAction(
  AttendeeActions.filterBy,
  props<{ filterBy?: string }>()
);
