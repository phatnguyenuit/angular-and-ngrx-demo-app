import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';

import { RootState } from 'app/state/root.reducer';

import { Attendee } from './models';
import { EventService } from './services/event.service';
import { addAttendee, loadAttendees } from './state/attendees/actions';
import { initialState } from './state/attendees/reducer';

import { EventComponent } from './event.component';
import { AddAttendeeComponent } from './components/add-attendee/add-attendee.component';
import { EventListComponent } from './components/event-list/event-list.component';
import { AttendeeComponent } from './components/attendee/attendee.component';

describe('EventComponent', () => {
  let component: EventComponent;
  let fixture: ComponentFixture<EventComponent>;
  let container: HTMLDivElement;

  let mockRouter: Router;
  let navigateSpy: jasmine.Spy;
  let mockStore: Store<RootState>;
  let dispatchSpy: jasmine.Spy;

  const changeValue = async (
    input: HTMLInputElement | HTMLSelectElement,
    value: string
  ) => {
    input.value = value;
    input.dispatchEvent(new Event('change'));
    await fixture.whenStable();
    await fixture.detectChanges();
  };

  const getByTestId = <TElement extends Element>(testId: string) => {
    const element: TElement | null = container.querySelector(
      `[data-testid="${testId}"]`
    );
    if (!element)
      throw new Error(
        `Cannot find element with data-testid=${JSON.stringify(testId)}`
      );

    return element;
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        EventComponent,
        AddAttendeeComponent,
        EventListComponent,
        AttendeeComponent,
      ],
      imports: [ReactiveFormsModule, RouterTestingModule],
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
    mockRouter = TestBed.inject(Router);
    mockStore = TestBed.inject(Store);
  });

  beforeEach(() => {
    navigateSpy = spyOn(mockRouter, 'navigateByUrl');
    dispatchSpy = spyOn(mockStore, 'dispatch');
    fixture = TestBed.createComponent(EventComponent);
    component = fixture.componentInstance;
    container = fixture.nativeElement;

    fixture.detectChanges();
  });

  afterEach(() => {
    navigateSpy.calls.reset();
    dispatchSpy.calls.reset();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call to load attendees on init', () => {
    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy).toHaveBeenCalledWith(loadAttendees());
  });

  it('should add attendee', () => {
    const sampleAttendee: Attendee = {
      name: 'test',
      guests: 0,
      isAttending: true,
    };
    component.addAttendee(sampleAttendee);

    expect(dispatchSpy).toHaveBeenCalledTimes(2);
    expect(dispatchSpy).toHaveBeenCalledWith(
      addAttendee({ payload: sampleAttendee })
    );
  });

  describe('should update the query params in case changing filterBy', () => {
    const filterByValues = ['all', 'withGuests', 'withoutGuests'];

    describe('from component', () => {
      filterByValues.forEach((filterByValue) => {
        it(`change filterBy into ${JSON.stringify(filterByValue)}`, () => {
          component.onChange(filterByValue);

          expect(navigateSpy).toHaveBeenCalledWith(
            `/event?filterBy=${filterByValue}`
          );
        });
      });
    });

    describe('from UI', () => {
      filterByValues.forEach((filterByValue) => {
        it(`change filterBy into ${JSON.stringify(
          filterByValue
        )}`, async () => {
          const selectElement: HTMLSelectElement = getByTestId('guests');
          await changeValue(selectElement, filterByValue);

          expect(navigateSpy).toHaveBeenCalledWith(
            `/event?filterBy=${filterByValue}`
          );
        });
      });
    });
  });
});
