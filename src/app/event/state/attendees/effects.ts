import { Injectable } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';
import { ofType } from '@ngrx/effects';
import { ROUTER_NAVIGATION, RouterNavigationAction } from '@ngrx/router-store';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { switchMap, map, catchError, filter } from 'rxjs/operators';
import { RootState } from 'app/state/root.reducer';

import { Attendee } from '../../models';
import { EventService } from '../../services/event.service';
import { filterBy as filterByAction } from './actions';
import {
  AttendeeActions,
  loadAttendeesFail,
  loadAttendeesSuccess,
  addAttendee,
  addAttendeeSuccess,
  addAttendeeFail,
} from './actions';

@Injectable()
export class AttendeesEffects {
  constructor(
    private actions$: Actions,
    private eventService: EventService,
    private store: Store<RootState>
  ) {}

  getAttendees$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AttendeeActions.loadAttendees),
      switchMap(() =>
        this.eventService.getAttendees().pipe(
          map((attendees: Attendee[]) => loadAttendeesSuccess({ attendees })),
          catchError((error) =>
            of(loadAttendeesFail({ errorMessage: error.message }))
          )
        )
      )
    )
  );

  addAttendee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AttendeeActions.addAttendee),
      switchMap((action: ReturnType<typeof addAttendee>) =>
        this.eventService.addAttendee(action.payload).pipe(
          map((attendee: Attendee) => addAttendeeSuccess({ attendee })),
          catchError((error) =>
            of(addAttendeeFail({ errorMessage: error.message }))
          )
        )
      )
    )
  );

  loadFilteredAttendees$ = createEffect(() =>
    this.actions$.pipe(
      ofType<RouterNavigationAction>(ROUTER_NAVIGATION),
      map(({ payload }) => ({
        url: payload.routerState.url,
        filterBy: payload.routerState.root.queryParams['filterBy'],
      })),
      filter(({ url }) => url.startsWith('/event')),
      map(({ filterBy = 'all' }) =>
        filterByAction({
          filterBy,
        })
      )
    )
  );
}
