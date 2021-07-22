import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Attendee } from '../../models';

@Component({
  selector: 'app-add-attendee',
  templateUrl: './add-attendee.component.html',
  styleUrls: ['./add-attendee.component.scss'],
})
export class AddAttendeeComponent {
  addAttendeeForm: FormGroup;

  @Output() addAttendeeEvent = new EventEmitter<Attendee>();

  constructor() {
    this.addAttendeeForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      guests: new FormControl(0, [Validators.required]),
      isAttending: new FormControl(true),
    });
  }

  submit() {
    if (this.addAttendeeForm.invalid) return;

    const { name, guests, isAttending } = this.addAttendeeForm.value;

    const attendee: Attendee = {
      name,
      guests,
      isAttending,
    };
    // Emit new attendee
    this.addAttendeeEvent.emit(attendee);

    // Reset form
    this.addAttendeeForm.reset({
      name: '',
      guests: 0,
      isAttending: true,
    });
  }
}
