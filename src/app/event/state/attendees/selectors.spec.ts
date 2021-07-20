import { selectAttendeesState, selectAttendees } from './selectors';
import { Attendee } from '../../models';
import { AttendeesState } from '../types';
import { initialState } from './reducer';

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
          ids: [],
          entities: {},
          errorMessage: 'Failed to load',
        },
        expected: {
          loading: false,
          ids: [],
          entities: {},
          errorMessage: 'Failed to load',
        },
      },
      {
        initialState: {
          loading: false,
          ids: [1],
          entities: {
            1: {
              id: 1,
              name: 'Test Attendee',
              attending: true,
              guests: 0,
            },
          },
        },
        expected: {
          loading: false,
          ids: [1],
          entities: {
            1: {
              id: 1,
              name: 'Test Attendee',
              attending: true,
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
            ids: [1],
            entities: {
              1: {
                id: 1,
                name: 'Test Attendee',
                attending: true,
                guests: 0,
              },
            },
          },
          expected: [
            {
              id: 1,
              name: 'Test Attendee',
              attending: true,
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
});
