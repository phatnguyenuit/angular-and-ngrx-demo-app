import { createSelector } from '@ngrx/store';
import { RootState } from 'app/state/root.reducer';

export const selectIsSpinning = createSelector(
  (state: RootState) => state.spinner,
  (isSpinning) => isSpinning
);
