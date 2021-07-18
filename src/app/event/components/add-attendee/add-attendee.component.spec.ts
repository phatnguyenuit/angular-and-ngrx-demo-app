import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { AddAttendeeComponent } from './add-attendee.component';
import { Attendee } from '../../models';

describe('AddAttendeeComponent', () => {
  let component: AddAttendeeComponent;
  let fixture: ComponentFixture<AddAttendeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddAttendeeComponent],
      imports: [ReactiveFormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAttendeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an invalid form on load', () => {
    expect(component.addAttendeeForm.valid).toBe(false);
  });

  it('should have a valid form', () => {
    component.addAttendeeForm.controls.name.setValue('Fast');
    expect(component.addAttendeeForm.valid).toEqual(true);
  });

  it('should not submit in case having invalid form', () => {
    const onAddAttendeeSpy = spyOn(component, 'onAddAttendee');
    const button: HTMLButtonElement = fixture.nativeElement.querySelector(
      `button[data-testid='submit']`
    );

    button.click();
    expect(onAddAttendeeSpy).not.toHaveBeenCalled();
  });

  it('should emit an attendee', () => {
    component.addAttendeeForm.controls.name.setValue('Fast');
    component.onAddAttendee.subscribe((attendee: Attendee) => {
      expect(attendee.name).toEqual('Fast');
    });
    component.submit();
  });
});
