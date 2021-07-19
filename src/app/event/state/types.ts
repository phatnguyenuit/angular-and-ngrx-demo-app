import { Attendee } from '../models';

export interface AttendeesState {
  loading: boolean;
  attendees: Attendee[];
  message?: string;
}
