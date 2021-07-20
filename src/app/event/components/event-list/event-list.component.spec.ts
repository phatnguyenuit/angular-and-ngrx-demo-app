import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EventListComponent } from './event-list.component';

describe('EventListComponent', () => {
  let component: EventListComponent;
  let fixture: ComponentFixture<EventListComponent>;
  let container: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EventListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventListComponent);
    component = fixture.componentInstance;
    container = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have no attendees on load', () => {
    const liElements = container.querySelectorAll('li');

    expect(liElements).toHaveSize(0);
  });

  it('should have one attendees on load', () => {
    component.attendees = [
      {
        name: 'Fast',
        attending: true,
        guests: 0,
      },
    ];

    fixture.detectChanges();

    const liElements = container.querySelectorAll('li');

    expect(liElements).toHaveSize(1);
  });
});
