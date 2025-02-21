import {ChangeDetectionStrategy, Component,OnInit  } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule,FormControl  } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
// import { MaterialTimePickerComponent } from '@candidosales/material-time-picker'; //third-party-library
import { MatDialog } from '@angular/material/dialog';
import { AppointmentDialogComponent } from '../appointment-dialog/appointment-dialog.component';
import { DateService } from '../../../service/DataService'; // Import DateService


@Component({
  selector: 'calendar-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    // MaterialTimePickerComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent implements OnInit {

  calendarForm: FormGroup;

  constructor(private fb: FormBuilder, public dialog: MatDialog,private dateService: DateService) {
    this.calendarForm = this.fb.group({
      dateControl: [new Date().toISOString().substring(0, 10), Validators.required],
      timeControl: ['', Validators.required],
    });
  }


  ngOnInit(): void {
    
  }

  onSubmit() {   
    const dateValue = this.calendarForm.get('dateControl')?.value; // Get the date value
    const timeValue = this.calendarForm.get('timeControl')?.value; // Get the time value

    if (dateValue && timeValue) {
      // Combine date and time into a single Date object
      const [hours, minutes] = timeValue.split(':').map(Number); // Split time into hours and minutes
      const dateTime = new Date(dateValue); // Create a Date object from the date value
      dateTime.setHours(hours, minutes); // Set the hours and minutes

      this.dateService.setSelectedDate(dateTime); // Set selected date
      console.log(dateTime); // This is your combined Date object
      // You can now use dateTime as needed in your application
    } else {
      console.error('Both date and time must be provided.');
    }

    // if (this.calendarForm.valid && this.timeControl.valid) {
    //   this.dateService.setSelectedDate(this.dateControl.value); // Set selected date
    //   console.log(this.calendarForm.value);
    // }
    // this.openAppointmentDialog(Date(),Date()); //test
  }

  
  get dateControl(): FormControl {
    return this.calendarForm.get('dateControl') as FormControl;
  }

  get timeControl(): FormControl {
    return this.calendarForm.get('timeControl') as FormControl;
  }

  
  openAppointmentDialog(startTime: any, endTime: any): void {
    const dialogRef = this.dialog.open(AppointmentDialogComponent, {
      width: '400px', // Adjust as needed
      data: { startTime: startTime, endTime: endTime } // Pass data to the dialog
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {
        console.log('Appointment Data:', result);
        // Handle the data returned from the dialog (e.g., save the appointment)
      }
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AppointmentDialogComponent, {
      width: '250px',
      data: {
        startTime: new Date(), // Set initial start time to the current date and time
        endTime: new Date(new Date().getTime() + 60 * 60 * 1000), // Set initial end time to one hour later
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Appointment Data:', result);
        // Handle the result here (e.g., save it to a server)
      }
    });
  }



  // getErrorMessage(controlName: string): string | null {
  //  console.log( "getErrorMessage called ---------------");
    
  //   const control = this.getControl(controlName);
  //   if (control?.errors) {
  //     if (control.errors['required']) {
  //       console.log( "getErrorMessage req ---------------");
  //       return `${this.getFieldLabel(controlName)} is required.`;
  //     } else if (control.errors['pattern']) {
  //       return `${this.getFieldLabel(controlName)} pattern is invalid.`;
  //     } 
  //   }
  //   return controlName + "---------";
  //   // return null;
  // }

  // getControl(controlName: string) {
  //   return this.calendarForm.get(controlName);
  // }

  // getFieldLabel(controlName: string): string {
  //   switch (controlName) {
  //     case 'dateControl':
  //       return 'Date';
  //     case 'timeControl':
  //       return 'Time';
  //     default:
  //       return controlName;
  //   }
  // }
  
}
