import { selectAttendeesState } from './selectors';
import { AttendeesState } from '../types';

interface TestCase {
  initialState?: AttendeesState;
  expected: AttendeesState;
}

describe('attendees.reducer', () => {
  const testCases: TestCase[] = [
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
