import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { EventService } from './services/event.service';
import { EventComponent } from './event.component';
import { AddAttendeeComponent } from './components/add-attendee/add-attendee.component';
import { EventListComponent } from './components/event-list/event-list.component';

describe('EventComponent', () => {
  let component: EventComponent;
  let fixture: ComponentFixture<EventComponent>;
  let mockStore: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EventComponent, AddAttendeeComponent, EventListComponent],
      imports: [ReactiveFormsModule],
      providers: [
        provideMockStore({
          initialState: {},
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
    mockStore = TestBed.inject(MockStore);
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
