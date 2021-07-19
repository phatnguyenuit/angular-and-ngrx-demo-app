import { createAction, props } from '@ngrx/store';
import { createGenerateActionType } from 'app/state/utils';
import { Attendee } from '../../models';

export const PREFIX = 'ATTENDEES';

export const generateActionType = createGenerateActionType(PREFIX);

export const loadAttendees = createAction(generateActionType('loadAttendees'));
export const loadAttendeesSuccess = createAction(
  generateActionType('loadAttendeesSuccess'),
  props<{ attendees: Attendee[] }>()
);
export const loadAttendeesFail = createAction(
  generateActionType('loadAttendeesFail'),
  props<{ message: string }>()
);
