import * as actions from './actions';
import { AttendeeActions, loadAttendees } from './actions';

describe('attendees.actions', () => {
  it('should return action to load attendees', () => {
    expect(actions.loadAttendees()).toEqual({
      type: AttendeeActions.loadAttendees,
    });
  });

  it('should return action to load attendees successfully', () => {
    expect(
      actions.loadAttendeesSuccess({
        attendees: [],
      })
    ).toEqual({
      type: AttendeeActions.loadAttendeesSuccess,
      attendees: [],
    });
  });

  it('should return action to load attendees failed', () => {
    expect(actions.loadAttendeesFail({ message: 'error message' })).toEqual({
      type: AttendeeActions.loadAttendeesFail,
      message: 'error message',
    });
  });
});
