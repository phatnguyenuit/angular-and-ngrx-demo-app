import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Attendee } from '../../models';

@Component({
  selector: 'app-add-attendee',
  templateUrl: './add-attendee.component.html',
  styleUrls: ['./add-attendee.component.scss'],
})
export class AddAttendeeComponent implements OnInit {
  addAttendeeForm: FormGroup;

  @Output() onAddAttendee = new EventEmitter<Attendee>();

  constructor() {
    this.addAttendeeForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {}

  submit() {
    if (this.addAttendeeForm.invalid) return;

    const attendee = {
      name: this.addAttendeeForm.value.name,
      attending: true,
      guests: 0,
    };
    // Emit new attendee
    this.onAddAttendee.emit(attendee);

    // Reset form
    this.addAttendeeForm.reset('');
  }
}
