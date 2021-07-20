import { EntityState } from '@ngrx/entity';

import { Attendee } from '../models';

export interface AttendeesState extends EntityState<Attendee> {
  loading: boolean;
  errorMessage?: string;
}
