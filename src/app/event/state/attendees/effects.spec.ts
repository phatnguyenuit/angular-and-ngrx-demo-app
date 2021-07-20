import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';

import { Attendee } from '../../models/attendee';
import { EventService } from '../../services/event.service';
import {
  loadAttendees,
  AttendeeActions,
  loadAttendeesSuccess,
} from './actions';
import { AttendeesEffects } from './effects';

describe('attendees.effects', () => {
  let httpMock: HttpTestingController;
  let effects: AttendeesEffects;
  let actions$: Observable<Action>;

  beforeEach(() => {
    actions$ = of(loadAttendees());
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        provideMockActions(() => actions$),
        AttendeesEffects,
        EventService,
      ],
    });

    effects = TestBed.inject(AttendeesEffects);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should call getAttendees effect and dispatch `loadAttendeesSuccess`', (done) => {
    const attendees: Attendee[] = [
      {
        id: 1,
        name: 'Fast',
        attending: true,
        guests: 0,
      },
    ];

    effects.getAttendees$.subscribe((action) => {
      expect(action).toEqual(
        loadAttendeesSuccess({
          attendees,
        })
      );
      done();
    });

    const req = httpMock.expectOne('/api/attendees');

    expect(req.request.method).toBe('GET');

    req.flush(attendees);
  });

  it('should call getAttendees effect and dispatch `loadAttendeesFail`', (done) => {
    effects.getAttendees$.subscribe((action) => {
      expect(action.type).toEqual(AttendeeActions.loadAttendeesFail);
      done();
    });

    const req = httpMock.expectOne('/api/attendees');

    expect(req.request.method).toBe('GET');

    req.error(new ErrorEvent('error event'), {
      status: 500,
      statusText: 'Internal error',
    });
  });
});
