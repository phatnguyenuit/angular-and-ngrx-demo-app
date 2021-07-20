import { createAction, props } from '@ngrx/store';
import { Attendee } from '../../models';

export enum AttendeeActions {
  loadAttendees = '[ATTENDEES] LOAD',
  loadAttendeesSuccess = '[ATTENDEES] LOAD SUCCESS',
  loadAttendeesFail = '[ATTENDEES] LOAD FAILED',
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
