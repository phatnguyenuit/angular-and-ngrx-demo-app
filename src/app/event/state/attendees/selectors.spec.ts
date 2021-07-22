import { Attendee } from '../../models';
import { AttendeesState } from '../types';
import { initialState } from './reducer';
import { selectFilteredAttendees } from './selectors';
import {
  selectAttendeesState,
  selectAttendees,
  selectIsLoading,
} from './selectors';

describe('attendees.selectors', () => {
  describe('selectAttendeesState', () => {
    const testCases: {
      initialState?: AttendeesState;
      expected: AttendeesState;
    }[] = [
      {
        initialState,
        expected: initialState,
      },
      {
        initialState: {
          ...initialState,
          loading: true,
        },
        expected: {
          ...initialState,
          loading: true,
        },
      },
      {
        initialState: {
          loading: false,
          filterBy: '',
          ids: [],
          entities: {},
          errorMessage: 'Failed to load',
        },
        expected: {
          loading: false,
          filterBy: '',
          ids: [],
          entities: {},
          errorMessage: 'Failed to load',
        },
      },
      {
        initialState: {
          loading: false,
          filterBy: '',
          ids: [1],
          entities: {
            1: {
              id: 1,
              name: 'Test Attendee',
              isAttending: true,
              guests: 0,
            },
          },
        },
        expected: {
          loading: false,
          filterBy: '',
          ids: [1],
          entities: {
            1: {
              id: 1,
              name: 'Test Attendee',
              isAttending: true,
              guests: 0,
            },
          },
        },
      },
    ];

    testCases.forEach((testCase, index) => {
      it(`should return attendees state correctly (test case: ${
        index + 1
      })`, () => {
        const result = selectAttendeesState.projector({
          attendees: testCase.initialState,
        });

        expect(result).toEqual(testCase.expected);
      });
    });
  });

  describe('selectAttendees', () => {
    const testCases: { initialState: AttendeesState; expected: Attendee[] }[] =
      [
        {
          initialState,
          expected: [],
        },
        {
          initialState: {
            loading: false,
            filterBy: '',
            ids: [1],
            entities: {
              1: {
                id: 1,
                name: 'Test Attendee',
                isAttending: true,
                guests: 0,
              },
            },
          },
          expected: [
            {
              id: 1,
              name: 'Test Attendee',
              isAttending: true,
              guests: 0,
            },
          ],
        },
      ];

    testCases.forEach((testCase, index) => {
      it(`should return attendees correctly (test case: ${index + 1})`, () => {
        const result = selectAttendees.projector(testCase.initialState);

        expect(result).toEqual(testCase.expected);
      });
    });
  });

  describe('selectIsLoading', () => {
    const testCases: { initialState: AttendeesState; expected: boolean }[] = [
      {
        initialState,
        expected: false,
      },
      {
        initialState: {
          ...initialState,
          loading: true,
        },
        expected: true,
      },
    ];

    testCases.forEach((testCase, index) => {
      it(`should return isLoading correctly (test case: ${index + 1})`, () => {
        const result = selectIsLoading.projector(testCase.initialState);

        expect(result).toEqual(testCase.expected);
      });
    });
  });

  describe('selectFilteredAttendees ', () => {
    const attendees: Attendee[] = [
      {
        id: 1,
        name: 'Test Attendee',
        isAttending: true,
        guests: 0,
      },
      {
        id: 2,
        name: 'Test Attendee 2',
        isAttending: true,
        guests: 1,
      },
    ];
    const testCases = {
      '': 2,
      all: 2,
      withGuests: 1,
      withoutGuests: 1,
      wrongFilterBy: 0,
    };

    Object.entries(testCases).forEach(([filterBy, expectedSize]) => {
      it(`should return filtered attendees correctly - case filterBy=${JSON.stringify(
        filterBy
      )}`, () => {
        const filteredAttendees = selectFilteredAttendees.projector(
          attendees,
          filterBy
        );

        expect(filteredAttendees).toHaveSize(expectedSize);
      });
    });
  });
});
