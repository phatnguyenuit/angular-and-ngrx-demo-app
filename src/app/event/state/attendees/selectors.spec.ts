import { selectAttendeesState, selectAttendees } from './selectors';
import { AttendeesState } from '../types';
import { Attendee } from 'app/event/models';

describe('attendees.selectors', () => {
  describe('selectAttendeesState', () => {
    const testCases: {
      initialState?: AttendeesState;
      expected: AttendeesState;
    }[] = [
      {
        initialState: {
          loading: false,
          attendees: [],
        },
        expected: {
          loading: false,
          attendees: [],
        },
      },
      {
        initialState: {
          loading: true,
          attendees: [],
        },
        expected: {
          loading: true,
          attendees: [],
        },
      },
      {
        initialState: {
          loading: false,
          attendees: [],
          message: 'Failed to load',
        },
        expected: {
          loading: false,
          attendees: [],
          message: 'Failed to load',
        },
      },
      {
        initialState: {
          loading: false,
          attendees: [
            {
              id: 1,
              name: 'Test Attendee',
              attending: true,
              guests: 0,
            },
          ],
        },
        expected: {
          loading: false,
          attendees: [
            {
              id: 1,
              name: 'Test Attendee',
              attending: true,
              guests: 0,
            },
          ],
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
          initialState: {
            loading: false,
            attendees: [],
          },
          expected: [],
        },
        {
          initialState: {
            loading: false,
            attendees: [
              {
                id: 1,
                name: 'test name',
                attending: true,
                guests: 0,
              },
            ],
          },
          expected: [
            {
              id: 1,
              name: 'test name',
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
