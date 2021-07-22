import { reducer } from './reducer';
import { Attendee } from '../../models/attendee';
import {
  addAttendeeSuccess,
  addAttendee,
  addAttendeeFail,
  filterBy,
} from './actions';
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
    const attendees: Attendee[] = [
      {
        id: 1,
        name: 'test',
        guests: 0,
        isAttending: true,
      },
    ];
    const action = loadAttendeesSuccess({ attendees });
    const nextState = reducer(undefined, action);

    expect(nextState.loading).toEqual(false);
    expect(nextState.ids).toHaveSize(attendees.length);
  });

  it('should return error message when loading attendees failed', () => {
    const action = loadAttendeesFail({ errorMessage: 'Failed to load' });
    const nextState = reducer(undefined, action);

    expect(nextState.loading).toEqual(false);
    expect(nextState.errorMessage).toEqual('Failed to load');
  });

  it('should return loading = `true` when adding attendee', () => {
    const action = addAttendee({
      payload: {
        name: 'test',
        guests: 0,
        isAttending: true,
      },
    });
    const nextState = reducer(undefined, action);

    expect(nextState.loading).toEqual(true);
  });

  it('should return new attendee when adding attendee successfully', () => {
    const attendee: Attendee = {
      id: 1,
      name: 'test',
      guests: 0,
      isAttending: true,
    };
    const action = addAttendeeSuccess({ attendee });
    const nextState = reducer(undefined, action);

    expect(nextState.loading).toEqual(false);
    expect(nextState.ids).toHaveSize(1);
  });

  it('should return error message when adding attendee failed', () => {
    const action = addAttendeeFail({ errorMessage: 'Failed to add' });
    const nextState = reducer(undefined, action);

    expect(nextState.loading).toEqual(false);
    expect(nextState.errorMessage).toEqual('Failed to add');
  });

  describe('filterBy', () => {
    const filterByValues = [
      undefined,
      '',
      'all',
      'withGuests',
      'withoutGuests',
    ];

    filterByValues.forEach((filterByValue) => {
      it(`should set value correctly - case filterBy=${JSON.stringify(
        filterByValue
      )}`, () => {
        const action = filterBy({ filterBy: filterByValue });
        const nextState = reducer(undefined, action);

        expect(nextState.filterBy).toEqual(filterByValue);
      });
    });
  });
});
