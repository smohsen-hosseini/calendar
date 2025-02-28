import { Component, Inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { ScheduleService } from '../../../service/ScheduleService'; // Import DateService
import { MatButtonModule } from '@angular/material/button';
import { CalendarComponent } from '../calendar/calendar.component';
import { CalendarEvent } from '../../../models/CalendarEvent';
// export interface AppointmentDialogData {
//   startTime: Date;
//   endTime: Date;
//   title: string;
// }

@Component({
  selector: 'app-appointment-dialog',
  standalone: true,
  imports: [
    CalendarComponent,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule, // Import MatDialogModule
    FormsModule, // Import FormsModule for form handling
    ReactiveFormsModule, // Import ReactiveFormsModule for reactive forms
    MatButtonModule,
  ],
  templateUrl: './appointment-dialog.component.html',
  styleUrl: './appointment-dialog.component.css',
})
export class AppointmentDialogComponent {
  showContent = false;
  selectedCalendarEvent!: CalendarEvent;

  constructor(
    public dialogRef: MatDialogRef<AppointmentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CalendarEvent,
    private scheduleService: ScheduleService
  ) {
    this.selectedCalendarEvent = data;
    console.log("+++++++++++++AppointmentDialogComponent appintmentTime: " + this.selectedCalendarEvent.appintmentTime)
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onDelete(): void {
    this.scheduleService.runMethodInTimeTable();
    this.dialogRef.close({ action: 'delete' });
  }

  closeModal(): void {
    this.dialogRef.close();
  }
}
