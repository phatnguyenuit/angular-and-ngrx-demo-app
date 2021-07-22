import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { RootState } from '../state/root.reducer';
import { Attendee } from './models';
import { loadAttendees, addAttendee } from './state/attendees/actions';
import {
  selectIsLoading,
  selectFilteredAttendees,
} from './state/attendees/selectors';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
})
export class EventComponent implements OnInit {
  attendees$!: Observable<Attendee[]>;
  isLoading$: Observable<boolean>;

  filterBy: string = 'all';

  constructor(
    private store: Store<RootState>,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.isLoading$ = this.store.select(selectIsLoading);
    this.attendees$ = this.store.select(selectFilteredAttendees);
    this.activatedRoute.queryParams.subscribe((params) => {
      this.filterBy = params['filterBy'];
    });
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

  onChange(filterBy: string) {
    this.router.navigateByUrl(`/event?filterBy=${filterBy}`);
  }
}
