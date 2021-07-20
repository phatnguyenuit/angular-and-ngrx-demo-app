import { Injectable } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';
import { ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

import { Attendee } from '../../models';
import { EventService } from '../../services/event.service';
import {
  AttendeeActions,
  loadAttendeesFail,
  loadAttendeesSuccess,
} from './actions';

@Injectable()
export class AttendeesEffects {
  constructor(private actions$: Actions, private eventService: EventService) {}

  getAttendees$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AttendeeActions.loadAttendees),
      switchMap(() =>
        this.eventService.getAttendees().pipe(
          map((attendees: Attendee[]) => loadAttendeesSuccess({ attendees })),
          catchError((error) =>
            of(loadAttendeesFail({ message: error.message }))
          )
        )
      )
    )
  );
}
