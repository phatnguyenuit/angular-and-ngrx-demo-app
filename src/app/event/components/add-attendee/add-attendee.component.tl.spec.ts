import { EventEmitter } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';

import { AddAttendeeComponent } from './add-attendee.component';
import { Attendee } from '../../models';

// Using @testing-library/angular with the postfix `.tl`

describe('[TL] AddAttendeeComponent', () => {
  const addAttendeeEvent = new EventEmitter<Attendee>();
  let emitAttendeeEventSpy: jasmine.Spy;

  beforeEach(async () => {
    emitAttendeeEventSpy = spyOn(addAttendeeEvent, 'emit');
    await render(AddAttendeeComponent, {
      imports: [ReactiveFormsModule],
      componentProperties: {
        addAttendeeEvent,
      },
    });
  });

  afterEach(() => {
    emitAttendeeEventSpy.calls.reset();
  });

  it('should render without crashing', () => {
    const nameInput = screen.getByLabelText('Name');
    const guestsInput = screen.getByLabelText('Guests');
    const isAttendingCheckbox = screen.getByLabelText('Attending?');
    const submitButton = screen.getByTestId('submit');

    expect(nameInput).toHaveValue('');
    expect(guestsInput).toHaveValue('0');
    expect(isAttendingCheckbox).toBeChecked();
    expect(submitButton).toBeDisabled();
  });

  it('should have valid form in case inputting $Name', () => {
    const nameInput = screen.getByLabelText('Name');
    const submitButton = screen.getByTestId('submit');

    userEvent.type(nameInput, 'Fast');

    expect(nameInput).toHaveValue('Fast');
    expect(submitButton).toBeEnabled();
  });

  it('should not submit in case having invalid form', () => {
    const nameInput = screen.getByLabelText('Name');
    const submitButton = screen.getByTestId('submit');

    expect(nameInput).toHaveValue('');
    expect(submitButton).toBeDisabled();

    submitButton.dispatchEvent(new Event('click'));

    expect(emitAttendeeEventSpy).not.toHaveBeenCalled();
  });

  it('should submit in case having valid form', () => {
    const nameInput = screen.getByLabelText('Name');
    const guestsInput = screen.getByLabelText('Guests');
    const isAttendingCheckbox = screen.getByLabelText('Attending?');
    const submitButton = screen.getByTestId('submit');

    userEvent.type(nameInput, 'Fast');

    userEvent.clear(guestsInput);
    userEvent.type(guestsInput, '3');

    userEvent.click(isAttendingCheckbox);

    userEvent.click(submitButton);

    const attendee: Attendee = {
      name: 'Fast',
      guests: 3,
      isAttending: false,
    };

    // Check if form submit
    expect(emitAttendeeEventSpy).toHaveBeenCalledOnceWith(attendee);

    // Check if form reset values
    expect(nameInput).toHaveValue('');
    expect(guestsInput).toHaveValue('0');
    expect(isAttendingCheckbox).toBeChecked();
  });
});
