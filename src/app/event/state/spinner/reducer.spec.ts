import { reducer } from './reducer';
import { startSpinner, stopSpinner } from './actions';

describe('spinner.reducer', () => {
  it('should return `true` when starting spinner', () => {
    const action = startSpinner();
    expect(reducer(undefined, action)).toEqual(true);
  });

  it('should return `false` when stopping spinner', () => {
    const action = stopSpinner();
    expect(reducer(undefined, action)).toEqual(false);
  });
});
