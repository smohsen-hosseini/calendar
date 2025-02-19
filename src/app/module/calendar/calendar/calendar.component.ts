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
      dateControl: [new Date(), Validators.required],
      timeControl: ['', Validators.required],
    });
  }


  ngOnInit(): void {
    
  }

  onSubmit() {
    console.log("onSubmit================");
    
    if (this.calendarForm.valid) {
      this.dateService.setSelectedDate(this.dateControl.value); // Set selected date
      console.log(this.calendarForm.value);
      }
      this.openAppointmentDialog(Date(),Date()); //test
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
  
}
