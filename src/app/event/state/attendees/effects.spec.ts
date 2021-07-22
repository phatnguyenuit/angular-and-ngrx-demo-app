import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { TypedAction } from '@ngrx/store/src/models';
import { provideMockStore } from '@ngrx/store/testing';
import { Observable, of } from 'rxjs';

import { Attendee } from '../../models/attendee';
import { EventService } from '../../services/event.service';
import { initialState } from '../../state/attendees/reducer';
import {
  AttendeeActions,
  loadAttendees,
  loadAttendeesSuccess,
  addAttendee,
  addAttendeeSuccess,
} from './actions';
import { AttendeesEffects } from './effects';

describe('attendees.effects', () => {
  let httpMock: HttpTestingController;
  let effects: AttendeesEffects;
  let actions$: Observable<Action>;

  const setupTest = <TAction extends TypedAction<string>>(action: TAction) => {
    actions$ = of(action);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        provideMockActions(() => actions$),
        provideMockStore({
          initialState: {
            event: {
              spinner: {},
              attendees: initialState,
            },
          },
        }),
        AttendeesEffects,
        EventService,
      ],
    });

    effects = TestBed.inject(AttendeesEffects);
    httpMock = TestBed.inject(HttpTestingController);
  };

  afterEach(() => {
    httpMock.verify();
  });

  describe('getAttendees$', () => {
    beforeEach(() => {
      setupTest(loadAttendees());
    });

    it('should call and dispatch action `loadAttendeesSuccess`', (done) => {
      const attendees: Attendee[] = [
        {
          id: 1,
          name: 'Fast',
          isAttending: true,
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

    it('should call and dispatch action `loadAttendeesFail`', (done) => {
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

  describe('addAttendee$', () => {
    const sampleAttendee: Attendee = {
      id: 1,
      name: 'Fast',
      isAttending: true,
      guests: 0,
    };

    beforeEach(() => {
      setupTest(addAttendee({ payload: sampleAttendee }));
    });

    it('should call addAttendee$ effect and dispatch action `addAttendeeSuccess`', (done) => {
      effects.addAttendee$.subscribe((action) => {
        expect(action).toEqual(
          addAttendeeSuccess({
            attendee: sampleAttendee,
          })
        );
        done();
      });

      const req = httpMock.expectOne('/api/attendees');

      expect(req.request.method).toBe('POST');

      req.flush(sampleAttendee);
    });

    it('should call addAttendee$ effect and dispatch action `addAttendeeFail`', (done) => {
      effects.addAttendee$.subscribe((action) => {
        expect(action.type).toEqual(AttendeeActions.addAttendeeFail);
        done();
      });

      const req = httpMock.expectOne('/api/attendees');

      expect(req.request.method).toBe('POST');

      req.error(new ErrorEvent('error event'), {
        status: 500,
        statusText: 'Internal error',
      });
    });
  });
});
