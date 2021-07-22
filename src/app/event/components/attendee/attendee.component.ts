import { Component, Input } from '@angular/core';
import { Attendee } from 'app/event/models';

@Component({
  selector: 'app-attendee',
  templateUrl: './attendee.component.html',
  styleUrls: ['./attendee.component.scss'],
})
export class AttendeeComponent {
  @Input() attendee!: Attendee;

  constructor() {}
}
