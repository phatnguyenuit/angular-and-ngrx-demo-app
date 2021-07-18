import { selectIsSpinning } from './selectors';

describe('spinner.reducer', () => {
  const testCases = [
    { initialState: true, expected: true },
    { initialState: false, expected: false },
  ];

  testCases.forEach((testCase, index) => {
    it(`should return spinner state correctly (test case: ${
      index + 1
    })`, () => {
      expect(selectIsSpinning.projector(testCase.initialState)).toEqual(
        testCase.expected
      );
    });
  });
});
