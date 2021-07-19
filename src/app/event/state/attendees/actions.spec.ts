import * as actions from './actions';

describe('attendees.actions', () => {
  it('should return action to load attendees', () => {
    expect(actions.loadAttendees()).toEqual({
      type: '[ATTENDEES]loadAttendees',
    });
  });

  it('should return action to load attendees successfully', () => {
    expect(
      actions.loadAttendeesSuccess({
        attendees: [],
      })
    ).toEqual({
      type: '[ATTENDEES]loadAttendeesSuccess',
      attendees: [],
    });
  });

  it('should return action to load attendees failed', () => {
    expect(actions.loadAttendeesFail({ message: 'error message' })).toEqual({
      type: '[ATTENDEES]loadAttendeesFail',
      message: 'error message',
    });
  });
});
