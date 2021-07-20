import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { Attendee } from '../models';
import { EventService } from './event.service';

describe('EventService', () => {
  let service: EventService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EventService],
    });
    service = TestBed.inject(EventService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return list of attendees', () => {
    const attendees: Attendee[] = [
      {
        id: 1,
        name: 'Fast',
        attending: true,
        guests: 0,
      },
    ];

    service.getAttendees().subscribe((result) => {
      expect(result).toBe(attendees);
    });

    const req = httpMock.expectOne('/api/attendees');

    expect(req.request.method).toBe('GET');

    req.flush(attendees);
  });

  it('should create attendee and return new attendee', () => {
    const attendee: Attendee = {
      id: 1,
      name: 'Fast',
      attending: true,
      guests: 0,
    };

    service.addAttendee(attendee).subscribe((result) => {
      expect(result).toBe(attendee);
    });

    // get test request
    const req = httpMock.expectOne('/api/attendees');

    expect(req.request.method).toBe('POST');

    // Resolve request with data
    req.flush(attendee);
  });
});

// Reference: https://www.thecodebuzz.com/angular-unit-test-and-mock-httpclient-get-request/
