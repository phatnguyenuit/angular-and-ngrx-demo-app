import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendeeComponent } from './attendee.component';
import { Attendee } from '../../models/attendee';

describe('AttendeeComponent', () => {
  let component: AttendeeComponent;
  let fixture: ComponentFixture<AttendeeComponent>;
  let container: HTMLElement;

  const getByTestId = (testId: string) => {
    const element = container.querySelector(`[data-testid="${testId}"]`);

    if (!element) {
      throw new Error(`No element found with data-testid='${testId}'`);
    }

    return element;
  };

  const sampleAttendee: Attendee = {
    name: 'Test',
    guests: 1,
    isAttending: true,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AttendeeComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendeeComponent);
    component = fixture.componentInstance;
    container = fixture.nativeElement;

    component.attendee = sampleAttendee;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render attendee', () => {
    const name = getByTestId('name');
    const guests = getByTestId('guests');
    const isAttending = getByTestId('isAttending');

    expect(name.textContent).toEqual(sampleAttendee.name);
    expect(guests.textContent).toEqual(sampleAttendee.guests.toString());
    expect(isAttending.textContent).toEqual(
      sampleAttendee.isAttending ? 'Yes' : 'No'
    );
  });
});
