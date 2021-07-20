import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { provideMockStore } from '@ngrx/store/testing';

import { EventService } from './services/event.service';
import { initialState } from './state/attendees/reducer';
import { EventComponent } from './event.component';
import { AddAttendeeComponent } from './components/add-attendee/add-attendee.component';
import { EventListComponent } from './components/event-list/event-list.component';

describe('EventComponent', () => {
  let component: EventComponent;
  let fixture: ComponentFixture<EventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EventComponent, AddAttendeeComponent, EventListComponent],
      imports: [ReactiveFormsModule],
      providers: [
        provideMockStore({
          initialState: {
            event: {
              spinner: {},
              attendees: initialState,
            },
          },
        }),
        {
          provide: HttpClient,
          useValue: null,
        },
        {
          provide: EventService,
          useValue: {
            getAttendees: () => {},
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
