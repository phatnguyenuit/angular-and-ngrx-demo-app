import * as actions from './actions';

describe('spinner.actions', () => {
  it('should return action to start spinner', () => {
    expect(actions.startSpinner()).toEqual({
      type: '[SPINNER]startSpinner',
    });
  });

  it('should return action to stop spinner', () => {
    expect(actions.stopSpinner()).toEqual({
      type: '[SPINNER]stopSpinner',
    });
  });
});
