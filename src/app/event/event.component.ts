import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';

import { RootState } from '../state/root.reducer';
import { Attendee } from './models';
import { EventService } from './services/event.service';
import { startSpinner, stopSpinner } from './state/spinner/actions';
import { selectIsSpinning } from './state/spinner/selectors';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
})
export class EventComponent implements OnInit {
  attendees$: Observable<Attendee[]>;
  isLoading$: Observable<boolean>;

  constructor(
    private eventService: EventService,
    private store: Store<RootState>
  ) {
    this.attendees$ = of([]);
    this.isLoading$ = this.store.select(selectIsSpinning);
  }

  ngOnInit() {
    this.getAttendees();
  }

  getAttendees() {
    this.attendees$ = this.eventService.getAttendees();
  }

  addAttendee(attendee: Attendee) {
    this.store.dispatch(startSpinner());
    this.eventService.addAttendee(attendee).subscribe(() => {
      this.store.dispatch(stopSpinner());
      this.getAttendees();
    });
  }
}
