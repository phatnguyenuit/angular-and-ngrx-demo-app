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
      const result = selectIsSpinning.projector({
        spinner: testCase.initialState,
      });

      expect(result).toEqual(testCase.expected);
    });
  });
});
