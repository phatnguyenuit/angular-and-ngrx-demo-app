import { Injectable } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';
import { ofType } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { Attendee } from '../../models';
import { EventService } from '../../services/event.service';
import {
  loadAttendees,
  loadAttendeesFail,
  loadAttendeesSuccess,
} from './actions';

@Injectable()
export class AttendeesEffects {
  constructor(private actions$: Actions, private eventService: EventService) {}

  getAttendees$ = createEffect(() => {
    const loadAttendeesAction = loadAttendees();
    return this.actions$.pipe(
      ofType(loadAttendeesAction.type),
      switchMap(() =>
        this.eventService.getAttendees().pipe(
          map((attendees: Attendee[]) => loadAttendeesSuccess({ attendees })),
          catchError((error) => of(loadAttendeesFail(error)))
        )
      )
    );
  });
}
