import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
// import { AppointmentDialogComponent } from '../appointment-dialog/appointment-dialog.component';
import { DateService } from '../../../service/DataService'; // Import DateService


@Component({
  selector: 'app-calendar-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent {

  calendarForm: FormGroup;

  constructor(private fb: FormBuilder, public dialog: MatDialog, private dateService: DateService) {
    this.calendarForm = this.fb.group({
      dateControl: [new Date().toISOString().substring(0, 10), Validators.required],
      timeControl: ['08:00', Validators.required],
      titleControl: ['', Validators.required],
    });
  }


  onSubmit() {
    const dateValue = this.calendarForm.get('dateControl')?.value; // Get the date value
    const timeValue = this.calendarForm.get('timeControl')?.value; // Get the time value
    const titleValue = this.calendarForm.get('titleControl')?.value; // Get the title value

    if (dateValue && timeValue) {
      // Combine date and time into a single Date object
      const [hours, minutes] = timeValue.split(':').map(Number); // Split time into hours and minutes
      const dateTime = new Date(dateValue); // Create a Date object from the date value

      dateTime.setHours(hours, minutes); // Set the hours and minutes
      // dateTime.setHours(hours); // Set the hours and minutes

      console.log(dateTime); // This is your combined Date object
      this.dateService.setSelectedDate(dateTime); // Set selected date
      this.dateService.setTitle(titleValue);

    } else {
      console.error('Both date and time must be provided.');
    }

    // this.openAppointmentDialog(Date(),Date()); //test
  }


  get dateControl(): FormControl {
    return this.calendarForm.get('dateControl') as FormControl;
  }

  get timeControl(): FormControl {
    return this.calendarForm.get('timeControl') as FormControl;
  }

  get titleControl(): FormControl {
    return this.calendarForm.get('titleControl') as FormControl;
  }

}
