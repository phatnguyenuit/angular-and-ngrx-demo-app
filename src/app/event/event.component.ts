import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { RootState } from '../state/root.reducer';
import { Attendee } from './models';
import { EventService } from './services/event.service';
import { loadAttendees, addAttendee } from './state/attendees/actions';
import { selectAttendees, selectIsLoading } from './state/attendees/selectors';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
})
export class EventComponent implements OnInit {
  attendees$!: Observable<Attendee[]>;
  isLoading$: Observable<boolean>;

  constructor(
    private eventService: EventService,
    private store: Store<RootState>
  ) {
    this.isLoading$ = this.store.select(selectIsLoading);
    this.attendees$ = this.store.select(selectAttendees);
  }

  ngOnInit() {
    this.getAttendees();
  }

  getAttendees() {
    this.store.dispatch(loadAttendees());
  }

  addAttendee(attendee: Attendee) {
    this.store.dispatch(addAttendee({ payload: attendee }));
  }
}
