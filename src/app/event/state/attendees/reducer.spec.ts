import { reducer } from './reducer';
import {
  loadAttendees,
  loadAttendeesSuccess,
  loadAttendeesFail,
} from './actions';

describe('attendees.reducer', () => {
  it('should return loading = `true` when loading attendees', () => {
    const action = loadAttendees();
    const nextState = reducer(undefined, action);

    expect(nextState.loading).toEqual(true);
  });

  it('should return attendees when loading attendees successfully', () => {
    const action = loadAttendeesSuccess({ attendees: [] });
    const nextState = reducer(undefined, action);

    expect(nextState.loading).toEqual(false);
    expect(nextState.attendees).toEqual([]);
  });

  it('should return error message when loading attendees failed', () => {
    const action = loadAttendeesFail({ message: 'Failed to load' });
    const nextState = reducer(undefined, action);

    expect(nextState.loading).toEqual(false);
    expect(nextState.message).toEqual('Failed to load');
  });
});
